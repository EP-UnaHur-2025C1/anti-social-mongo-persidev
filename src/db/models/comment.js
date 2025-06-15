const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema()

// Exportacion
module.exports = mongoose.model('Comment', commentSchema)
