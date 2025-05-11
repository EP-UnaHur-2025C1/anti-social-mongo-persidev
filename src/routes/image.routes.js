const { Router } = require('express')
const imageRoutes = Router()
const { imageControllers } = require('../controllers')
const { existsImage } = require('../middlewares')

imageRoutes.get('/', imageControllers.getImages)

/* imageRoutes.get('/:id', existsImage, imageControllers.getImageById)

imageRoutes.delete('/:id', existsImage, imageControllers.deleteById) */

module.exports = imageRoutes
