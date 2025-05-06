const { Router } = require('express')
const { tagControllers } = require('../controllers')

const tagRoutes = Router()

// Metodos
tagRoutes.get('/', tagControllers.getTags)

// Exporacion
module.exports = tagRoutes
