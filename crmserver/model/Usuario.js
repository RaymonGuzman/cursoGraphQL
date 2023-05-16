const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rol:{
        type: String,
        default: "employee"
    },
    creado: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Usuario', UsuariosSchema);