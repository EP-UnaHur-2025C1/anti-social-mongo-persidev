const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema()

// Exportacion
module.exports = mongoose.model('Image', imageSchema)
