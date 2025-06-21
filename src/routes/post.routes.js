const { Router } = require('express')
const { Post, User } = require('../db/models')
const { postControllers } = require('../controllers')
const { genericMiddlewares, cacheMiddlewares, postMiddlewares } = require('../middlewares')
const { postSchema, tagSchema } = require('../schemas')
const postRoutes = Router()

// Metodos
// Get
postRoutes.get('/', cacheMiddlewares.checkCache('all_posts'), postControllers.getPosts)

postRoutes.get(
  '/:id',
  cacheMiddlewares.checkCache('post'),
  genericMiddlewares.existID(Post),
  postControllers.getPostByPk
)

// Post
postRoutes.post(
  '/',
  genericMiddlewares.checkIdInModel(User, 'UserId'),
  genericMiddlewares.validatorSchema(postSchema),
  postControllers.createPost
)

postRoutes.post(
  '/:id',
  genericMiddlewares.existID(Post),
  genericMiddlewares.validatorSchema(tagSchema),
  postControllers.createTagPost
)

// Put
postRoutes.put(
  '/:id',
  genericMiddlewares.validatorSchema(postSchema),
  genericMiddlewares.existID(Post),
  postControllers.editPost
)

postRoutes.put('/:id/images/:imgId', postControllers.editPostImage)

// Delete
postRoutes.delete(
  '/:id',
  cacheMiddlewares.deleteCache('post'),
  genericMiddlewares.existID(Post),
  postControllers.deletePost
)

postRoutes.delete('/:id/images/:imgId', postControllers.deletePostImage)

postRoutes.delete('/:postId/tag/:tagId', postControllers.deleteTagPost)

// Exportacion
module.exports = postRoutes
