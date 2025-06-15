const mongoose = require('mongoose')

const postSchema = new mongoose.Schema()

// Exportacion
module.exports = mongoose.model('Post', postSchema)
