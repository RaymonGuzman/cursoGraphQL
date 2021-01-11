const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  modelo: {
    type: String,
    required: false,
    trim: true,
  },
  existencia: {
    type: Number,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

//Creando Index para buscar por nombre
ProductosSchema.index({ nombre: 'text' });

module.exports = mongoose.model('Productos', ProductosSchema);