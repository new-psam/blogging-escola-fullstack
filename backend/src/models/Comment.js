const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    texto: {
        type: String,
        require: true
    },
    autor: {
        type: String,
        default: 'Aluno Anônimo'
    },

    // O comentário precisa saber a qual Post ele pertence!
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', CommentSchema);