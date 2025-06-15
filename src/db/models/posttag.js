const mongoose = require('mongoose')

const postTagSchema = new mongoose.Schema()

// Exportacion
module.exports = mongoose.model('PostTag', postTagSchema)
