const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema()

// Exportacion
module.exports = mongoose.model('Tag', tagSchema)
