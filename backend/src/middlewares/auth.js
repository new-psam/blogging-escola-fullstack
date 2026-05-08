//const jwt = require('jsonwebtoken');
const admin = require('../config/firebase')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token não informado'});

    
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).json({error: 'token mal formatado'});
    
    // o token vem no formato "Bearer ejks.."
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token com formato inválido' });
    }
    
    try {
        // 1. Verifica o token no Firebase (Crachá de Identidade)
        const decodedToken = await admin.auth().verifyIdToken(token);

        // 2. Busca o usuário no MongoDB usando o UID do Firebase
        const user = await User.findOne({firebaseUid: decodedToken.uid});

        if (!user) {
            return res.status(401).json({error: "Usuário não encontrado no banco de dados!"});
        }

        // 3. Pendura os dados na requisição para os próximos passos usarem
        req.userFirebaseUid = decodedToken.uid; 
        req.userId = user._id;     // Essencial para o PostController saber quem é o autor do Post!
        req.userRole = user.role;  // Essencial para o permission.js saber se é Professor/Admin!


        return next();
    } catch (err) {
        console.error("Erro n averificação do token:", err)
        return res.status(401).json({ error: 'token inválido ou expirado.'});
    }
    
};