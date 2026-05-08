const express = require('express');
const routes = express.Router();

// Controllers
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController');

//Middlewares
const authMiddleware = require('./middlewares/auth');
const checkRole = require('./middlewares/permission');

// Definindo os "crachás" de permissão
const isProfessor = checkRole('professor');
const isAdmin = checkRole('admin');

// 1-Rotas Públicas
routes.post('/auth/register', AuthController.register);
//routes.post('/auth/login', AuthController.login);


routes.get('/posts', PostController.index);
routes.get('/posts/search', PostController.search);
routes.get('/posts/:id', PostController.show);
routes.get('/posts/:id/comments', PostController.searchCom);


// --- Daqui para baixo, precisa estar logado (Aluno ou Professor) ---
routes.use(authMiddleware);
routes.get('/auth/me', AuthController.me);

// Leitura (Aluno e Professor)

routes.post('/posts/:id/comments', PostController.createCom);

// Escrita/Gestão (Apenas Professor)
routes.post('/posts', isProfessor, PostController.store);
routes.put('/posts/:id', isProfessor, PostController.update);
routes.delete('/posts/:id', isProfessor, PostController.delete);

//Professores e Admins podem ver a lista de usuários
routes.get('/users', isProfessor, UserController.index);


// Rotas de usuário somente admin
routes.post('/users', isAdmin, UserController.store);
routes.put('/users/:id', isAdmin, UserController.update);
routes.delete('/users/:id', isAdmin, UserController.delete);

module.exports = routes;