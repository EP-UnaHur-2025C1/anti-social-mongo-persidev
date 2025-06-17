const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  description: {
    type: String,
    unique: [true, 'La descripcion debe ser unica, Ya existe el tag'],
    required: [true, 'La descripcion es requerida']
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
}, { strict: false }) // para que sea flexible a crear con mas atributos

// creo el modelo y lo exporto
module.exports = mongoose.model('Tag', tagSchema)
