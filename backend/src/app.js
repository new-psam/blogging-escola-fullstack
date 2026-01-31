const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
// Importa o arquivo JSON que você acabou de criar
const swaggerDocument = require('./docs/swagger.json');


const app = express();
// 1. Configuração do CORS (Para o Front-end funcionar)
app.use(cors());

app.use(express.json());

// 2. Confia no Proxy (Para nuvem/Docker saberem se é HTTPS)
app.set('trust proxy', true);

// 3. Função Inteligente: Ajusta o servidor do Swagger dinamicamente
const buildSwaggerDoc = (req) => {
    // Cria a cópia do json original
    const doc = JSON.parse(JSON.stringify(swaggerDocument));

    // Detecta o protocolo (http ou https) e o host (localhost ou domínio real)
    const protoHeader = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const proto = protoHeader.split(',')[0].trim();
    const host = req.headers['x-forwarded-host'] || req.headers.host;

    // Atualiza a URL do servidor no Swagger para o botão "Try it out" funcionar
    if (host) {
        doc.servers = [{ url: `${proto}://${host}` }];
    }
    return doc;
};

// 4. Configuração da Interface do Swagger
// Serve a UI visual e aponta para a rota JSON abaixo
const swaggerUiHandler = swaggerUi.setup(null, { swaggerUrl: '/swagger.json'});
app.use('/api-docs', swaggerUi.serve, swaggerUiHandler)

// Rota que entrega o JSON modificado com a URL correta
app.get('/swagger.json', (req, res) => res.json(buildSwaggerDoc(req)));

app.use(routes);

module.exports = app;