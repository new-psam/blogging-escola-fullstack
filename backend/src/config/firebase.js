const admin = require('firebase-admin');
const fs = require('fs');

let serviceAccount;

// O Render salva os "Secret Files" sempre nesta pasta especial:
const renderSecretPath = '/etc/secrets/firebase-service-account.json';

// O nosso caminho local no seu computador:
const localSecretPath = './firebase-service-account.json';

// O código decide qual usar dependendo de onde está rodando
if (fs.existsSync(renderSecretPath)) {
    serviceAccount = require(renderSecretPath);
} else {
    serviceAccount = require(localSecretPath);
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin inicializado com sucesso!');
}

module.exports = admin;