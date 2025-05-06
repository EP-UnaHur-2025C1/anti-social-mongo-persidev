const { Router } = require('express')
const { userControllers } = require('../controllers')

const userRoutes = Router()

// Metodos
userRoutes.get('/', userControllers.getUsers)
userRoutes.get('/:id', userControllers.getUser)
userRoutes.post('/', userControllers.createUser)
// Exportacion
module.exports = userRoutes
