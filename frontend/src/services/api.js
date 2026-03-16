import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
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