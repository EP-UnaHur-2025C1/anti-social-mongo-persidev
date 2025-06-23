const { Router } = require('express')
const commentRoutes = Router()
const { Comment, User, Post } = require('../db/models')
const { genericMiddlewares, cacheMiddlewares } = require('../middlewares')
const { commentSchema } = require('../schemas')
const { commentController } = require('../controllers')

commentRoutes.get('/', cacheMiddlewares.checkCache('all_comments'), commentController.getAllComments)

commentRoutes.get('/:id',
  cacheMiddlewares.checkCache('comment'),
  genericMiddlewares.existID(Comment),
  commentController.getCommentById)

commentRoutes.post('/',
  genericMiddlewares.checkIdInModel(User, 'UserId'),
  genericMiddlewares.checkIdInModel(Post, 'PostId'),
  genericMiddlewares.validatorSchema(commentSchema),
  commentController.createComment)

commentRoutes.put('/:id',
  genericMiddlewares.existID(Comment),
  commentController.updateComment)

commentRoutes.delete('/:id',
  cacheMiddlewares.deleteCache('comment'),
  genericMiddlewares.existID(Comment),
  commentController.deleteCommentById)

module.exports = commentRoutes
