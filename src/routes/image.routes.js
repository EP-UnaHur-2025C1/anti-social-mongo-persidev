const { Router } = require('express')
const imageRoutes = Router()
const { Image } = require('../db/models')
const { imageControllers } = require('../controllers')
const { genericMiddlewares, cacheMiddlewares } = require('../middlewares')
const { imageSchema } = require('../schemas')

imageRoutes.get('/', cacheMiddlewares.checkCache('all_images'), imageControllers.getImages)

imageRoutes.get('/:id',
  cacheMiddlewares.checkCache('image'),
  genericMiddlewares.existID(Image),
  imageControllers.getImageById)

imageRoutes.post('/',
  genericMiddlewares.validatorSchema(imageSchema),
  imageControllers.createImage)

imageRoutes.delete('/:id',
  cacheMiddlewares.deleteCache('image'),
  genericMiddlewares.existID(Image),
  imageControllers.deleteImageById)

module.exports = imageRoutes
