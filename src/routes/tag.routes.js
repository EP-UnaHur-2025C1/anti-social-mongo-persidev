const { Router } = require('express')
const { tagControllers } = require('../controllers')
const { Tag } = require('../db/models')
const { genericMiddlewares, tagMiddlewares, cacheMiddlewares } = require('../middlewares')
const { tagSchema } = require('../schemas')
const tagRoutes = Router()

// Rutas
tagRoutes.get('/', cacheMiddlewares.checkCache('all_tags'), tagControllers.getTags)

tagRoutes.get(
  '/:id',
  cacheMiddlewares.checkCache('tag'),
  genericMiddlewares.existID(Tag),
  tagControllers.getTagById
)

tagRoutes.post(
  '/',
  tagMiddlewares.existTag,
  genericMiddlewares.validatorSchema(tagSchema),
  tagControllers.createTag
)

tagRoutes.put(
  '/:id',
  genericMiddlewares.validatorSchema(tagSchema),
  genericMiddlewares.existID(Tag),
  tagMiddlewares.existTag,
  tagControllers.updateTagById
)

tagRoutes.delete(
  '/:id',
  cacheMiddlewares.deleteCache('tag'),
  genericMiddlewares.existID(Tag),
  tagControllers.deleteTagById
)

// Exportacion
module.exports = tagRoutes
