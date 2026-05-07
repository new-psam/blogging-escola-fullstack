const admin = require('firebase-admin');

// No Render, vamos configurar para ler o arquivo secreto que você vai subir lá
// Localmente, você aponta para o caminho do arquivo no seu computador
const serviceAccount = require('./firebase-service-account.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin inicializado com sucesso!');
}

module.exports = admin;