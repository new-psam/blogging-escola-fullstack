import axios from 'axios';


// O JavaScript olha para a barra de endereços do navegador.
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Se estiver no seu PC, usa a porta 3000. Se estiver na nuvem, usa o Render.
const API_URL = isLocalhost 
  ? 'http://localhost:3000' 
  : 'https://blogging-escola-backend.onrender.com'; // Confirme se essa é a URL correta do seu back-end!


export const api = axios.create({
    baseURL: API_URL,
});

// 2. O INSPETOR (Interceptor) - A MÁGICA ACONTECE AQUI!
// Antes de qualquer requisição sair do Frontend, ele roda essa função:
api.interceptors.request.use((config) => {
  // Pega o token do cofre
  const token = localStorage.getItem('@EduBlog:token');
  
  // Se o token existir, pendura ele no cabeçalho de Autorização
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});