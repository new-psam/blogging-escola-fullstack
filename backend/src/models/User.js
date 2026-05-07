const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: { 
        type: String, 
        unique: true, 
        required: true,
        lowercase: true,
        match: /.+\@.+\.+/
    },
    
    role: {
        type: String,
        enum: [ 'professor', 'aluno', 'admin'], //Define papéis permitidos
        default: 'aluno'
    },
    //O ID único que o Firebase vai gerar e nos devolver
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });



module.exports = mongoose.model('User', UserSchema);