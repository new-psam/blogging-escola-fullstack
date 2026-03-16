# ==========================================
# ESTÁGIO 1: Build (Construindo o React/Vite)
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código do frontend
COPY . .

# Roda o Vite para empacotar o React e gerar a pasta 'dist'
RUN npm run build

# ==========================================
# ESTÁGIO 2: Servidor Web (Nginx)
# ==========================================
FROM nginx:alpine

# Limpa a pasta padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# MÁGICA: Copia apenas a pasta 'dist' do Estágio 1 para dentro do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]