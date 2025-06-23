const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  nickName: {
    type: String,
    unique: [true, 'El nickName debe ser único'],
    require: [true, 'El nickName es requerido'],
    minLength: [5, 'El nickName debe tener una longitud minima de 5 caracteres']
  },
  email: {
    type: String,
    unique: [true, 'El email debe ser único'],
    require: [true, 'El email es requerido']
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
})

// Exportacion
module.exports = mongoose.model('User', userSchema)
