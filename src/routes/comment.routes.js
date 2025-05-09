const { Router } = require('express')
const commentRoutes = Router()
const { Comment } = require('../db/models')
const { genericMiddlewares } = require('../middlewares')
const { commentSchema } = require('../schemas')
const { commentController } = require('../controllers')

commentRoutes.get('/', commentController.getAllComments)

commentRoutes.get('/:id',
  genericMiddlewares.validateId,
  genericMiddlewares.existID(Comment),
  commentController.getCommentById)

commentRoutes.post('/',
  genericMiddlewares.schemaValidator(commentSchema),
  commentController.createComment)

commentRoutes.put('/:id',
  genericMiddlewares.validateId,
  genericMiddlewares.existID(Comment),
  commentController.updateComment)

commentRoutes.delete('/:id',
  genericMiddlewares.validateId,
  genericMiddlewares.existID(Comment),
  commentController.deleteCommentById)

module.exports = commentRoutes
