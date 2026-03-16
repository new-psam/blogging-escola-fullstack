
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = {
    // Lista Pública (Alunos e Professores)
    async index(req, res) {
        //console.log("--> Acessou rota GET /posts"); //Log de entrada
        try {
            const posts = await Post.find().sort({ dataCriacao: -1});
            return res.status(200).json(posts);
        } catch (err) {
            console.error("ERRO AO LISTAR POSTS:", err); 
            return res.status(500).json({ error: 'Erro interno ao listar posts'});
        }
    },

    async search(req, res) {
        const { q } = req.query;
        try {
            if (!q) {
                return res.status(400).json({ error: 'Parâmetro de busca não informado'});
            }
            const posts = await Post.find({ $text: { $search: q}});
            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).json({ error: 'Erro na busca'});
        }
    },

    async show(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' });
            }
            return res.status(200).json(post);
        } catch (e) {
             return res.status(400).json({error: 'ID Inválido!'});
        }
    },

    // Apenas Professores (Validado na Rota)
    async store(req, res) {
        try {
            const post = await Post.create(req.body);
            return res.status(201).json(post);
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao criar post' });
        }
    },

    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true }
            );
            if (!post) {
            return res.status(404).json({ error: 'Post não encontrado' });
            }
            return res.status(200).json(post);
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao atualizar' });
        }
    },

    async delete(req, res) {
        try {
           const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' });
            }
            // apga comentários
            await Comment.deleteMany({ postId: req.params.id });

            return res.status(204).send(); 
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao deletar' });
        }
        
    },

    async createCom(req, res) {
        try {
            const { texto, autor } = req.body;
            const postId = req.params.id;

            const novoComentario = await Comment.create({
                texto,
                autor: autor || 'Aluno Anônimo',
                postId
            });

            res.status(201).json(novoComentario);
        } catch (error) {
            res.status(500).json({error: 'Erro ao criar comentário.'});
        }
    },

    async searchCom(req, res) {
        try {
            const postId = req.params.id;
            // Busca todos os comentários que têm o ID desse post, ordenados do mais novo pro mais velho
            const comentarios = await Comment.find({postId}).sort({ dataCriacao: -1});

            res.status(200).json(comentarios);
        } catch (error) {
            res.status(500).json({error: 'Erro ao buscar comentários'});
        }
    }
};