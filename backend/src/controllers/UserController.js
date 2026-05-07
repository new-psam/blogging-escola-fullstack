const User = require('../models/User');
const admin = require('../config/firebase');

module.exports = {
    // 1. Listar Usuários
    async index(req, res){
        try {
            const { role } = req.query;
            const query = role ? { role } : {};
            const users = await User.find(query);
            return res.json(users);
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar usuários.'});
        }
    },

    //2. criar usuário ( a mágica da arquitetura hibrida)
    async store(req, res){
        const { nome, email, password, role} = req.body;

        if (!nome || !email || !password || !role) {
            return res.status(400).json({ error: 'Preencha todos os campos.' });
        }

        try {
      // Passo A: Cria o usuário no "Segurança" (Firebase)
      const firebaseUser = await admin.auth().createUser({
        email,
        password,
        displayName: nome,
      });

      // Passo B: Cria o perfil no "RH" (MongoDB) usando o UID do Firebase
      const newUser = await User.create({
        nome,
        email,
        role,
        firebaseUid: firebaseUser.uid,
      });

      return res.status(201).json(newUser);
        } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(400).json({ error: 'Erro ao criar usuário. O e-mail pode já estar em uso.' });
        }
    },

    // 3. Atualizar o usuário
    async update(req, res) {
        const { id } = req.params;
        const {nome, email, role, password } = req.body;

        try {
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado.'});

            const firebaseUpdates = {};
            if (email) firebaseUpdates.email = email;
            if (password) firebaseUpdates.password = password // Firebase criptografa automaticamente
            if (nome) firebaseUpdates.displayName = nome;

            // só manda atualizar no Firebase se tiver algo para mudar lá
            if (Object.keys(firebaseUpdates).length > 0){
                await admin.auth().updateUser(user.firebaseUid, firebaseUpdates);
            }

            // passo B atualiza o mongo DB
            if (nome) user.nome = nome;
            if (email) user.email = email;
            if (role) user.role = role;

            await user.save();

            return res.json({ message: 'Usuário atualizado com sucesso!', user });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return res.status(500).json({ error: 'Erro ao atualizar usuário. E-mail pode estar em uso.' });
        }
        
    },

    // 4. DELETAR USUÁRIO
    async delete(req, res) {
        try {
            const { id } = req.params;
        
            // Busca o usuário no MongoDB para descobrir qual é o ID dele no Firebase
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

            // Passo A: Apaga do Firebase
            await admin.auth().deleteUser(user.firebaseUid);
        
            // Passo B: Apaga do MongoDB
            await User.findByIdAndDelete(id);

            return res.json({ message: 'Usuário excluído com sucesso das duas bases.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao excluir usuário.' });
        }
  }
};