//const jwt = require('jsonwebtoken');
const admin = require('../config/firebase')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ error: 'Token não informado'});

    
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).send({error: 'Erro no token'});
    
    // o token vem no formato "Bearer ejks.."
    const [, token] = parts;

    try {
        // o firebase verifica se o token é válido, se não expiroi,etc
        const decodedToken = await admin.auth().verifyIdToken(token);

        // pegamos o UID do Firebase e colocamos na requisição para os controllers usarem
        req.userFirebaseUid = decodedToken.uid;
        // Opcional: Se você quiser passar o email também
        req.userEmail = decodedToken.email;

        return next();
    } catch (err) {
        console.error("Erro n averificação do token:", err)
        return res.status(401).json({ error: 'token inválido ou expirado.'});
    }

    // const [scheme, token] = parts;
    // if (!/^Bearer$/i.test(scheme)) return res.status(401).send({error: 'Token malformatado'});

    // jwt.verify(token, process.env.SECRET || 'segredo_escola', (err, decoded) => {
    //     if (err) return res.status(401).send({error: 'Token inválido' });
    //     req.userId = decoded.id;
    //     req.userRole = decoded.role; // Salvamos a role para checar depois
    //     return next();
    // });
};