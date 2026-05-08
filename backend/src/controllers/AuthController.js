const User = require('../models/User');


module.exports = {
    async register(req, res) {
        const { nome, email, role, firebaseUid } = req.body;
      
        try {
         
            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'Usuário já existe' });
            }

            // Tenta criar o usuário
            const newUser = await User.create({
                nome,
                email,
                role: role || 'aluno',
                firebaseUid
            });

            return res.status(201).json(newUser);

        } catch (error) {
            // AQUI ESTÁ A CORREÇÃO: Retorna o erro real em vez de travar
            console.error("Erro no Registro:", error); 
            return res.status(400).json({ error: 'Falha ao salvar o perfil no banco de dados.' });
        }
    },

    // Chamado na tela de login para devolver os dados do usuário logado
    async me(req, res){
        try {
            // O req.user.FirebaseUId vem do nosso authMiddleware ( que verificou o token!)
            const user = await User.findOne({firebaseUid: req.userFirebaseUid });

            if (!user){
                return res.status(404).json({ error: 'Perfil não encontrado.'});
            }

            return res.json(user);
        } catch (error) {
            console.error("Erro no /me:", error);
            return res.status(500).json({error: 'Erro ao buscar o perfil'});
        }
    }
};