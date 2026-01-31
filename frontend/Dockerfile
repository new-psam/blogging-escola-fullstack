# Usa uma imagem muito leve do Nginx (servidor web)
FROM nginx:alpine

# Copia seus arquivos HTML/CSS/JS para a pasta pública do Nginx
COPY ./src /usr/share/nginx/html

# O Nginx roda nativamente na porta 80
EXPOSE 80

# O comando padrão do Nginx já sobe o servidor automaticamente