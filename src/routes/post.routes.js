const { Router } = require('express')
const { postControllers } = require('../controllers')
const postRoutes = Router()

// Metodos
postRoutes.get('/', postControllers.getPosts)

// Exportacion
module.exports = postRoutes
