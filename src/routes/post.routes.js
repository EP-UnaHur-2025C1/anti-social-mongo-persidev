const { Router } = require('express')
const { Post } = require('../db/models')
const { postControllers } = require('../controllers')
const { genericMiddlewares } = require('../middlewares')
const { postSchema } = require('../schemas')
const postRoutes = Router()

// Metodos
// Get
postRoutes.get('/', postControllers.getPosts)

postRoutes.get('/:id',
  genericMiddlewares.existID(Post),
  genericMiddlewares.validateID(Post),
  postControllers.getPostByPk
)

// postRoutes.get('/:idPost/comments/', postControllers)

// Post
postRoutes.post('/',
  genericMiddlewares.validatorSchema(postSchema),
  postControllers.createPost
)

// Put
postRoutes.put('/:id',
  genericMiddlewares.validatorSchema(postSchema),
  genericMiddlewares.existID(Post),
  genericMiddlewares.validateID(Post),
  postControllers.editPost
)

// Delete
postRoutes.delete('/:id',
  genericMiddlewares.existID(Post),
  genericMiddlewares.validateID(Post),
  postControllers.deletePost
)

// Exportacion
module.exports = postRoutes
