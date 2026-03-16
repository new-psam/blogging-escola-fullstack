# Front-end - Projeto Blogging Escola 🏫 (FIVAM)

Interface de usuário moderna e responsiva para a plataforma de gerenciamento de postagens escolares. Desenvolvida para oferecer uma experiência de leitura agradável para os alunos e um painel de gestão intuitivo para os professores.

## 🚀 Tecnologias Utilizadas

- **React & Vite:** Biblioteca principal para construção da interface e bundler de alta performance.
- **Tailwind CSS:** Framework de utilitários CSS para estilização ágil e design responsivo (Mobile-first).
- **React Router Dom:** Gerenciamento de rotas protegidas e navegação entre páginas (SPA).
- **Axios:** Cliente HTTP para consumo e integração com a API RESTful do back-end.
- **Context API:** Gerenciamento de estado global da aplicação (Autenticação e Sessão).
- **Vitest & Testing Library:** Ambiente moderno e robusto para testes unitários e de integração de componentes React.

## ⚙️ Funcionalidades

### 🎓 Área Pública (Alunos e Visitantes)

- **Feed de Publicações:** Listagem de todos os artigos em formato de cards.
- **Busca Integrada:** Campo de pesquisa na Home para filtrar postagens por título ou conteúdo.
- **Leitura Otimizada:** Páginas de artigos com tipografia ajustada para leitura (layout de livro).
- **Design Responsivo:** Adaptação perfeita para visualização em celulares, tablets e desktops.

### 👩‍🏫 Área Restrita (Professores)

- **Autenticação:** Sistema de Login e Cadastro (com definição de _role_).
- **Proteção de Rotas:** Bloqueio de acesso de alunos ao painel de gestão.
- **Painel de Controle (Dashboard):** Visão geral das publicações do professor logado.
- **Gestão de Conteúdo (CRUD):** Formulários para criar, editar e excluir postagens exclusivas do autor.

## 🛠️ Como Rodar o Projeto (Localmente)

### Pré-requisitos

- Node.js instalado (versão 18+ recomendada).
- O **Back-end** do projeto já deve estar rodando na sua máquina (preferencialmente na porta `3000`).

### Passo a Passo

1. Acesse a pasta do frontend no terminal:
   ```bash
   cd frontend
   ```
