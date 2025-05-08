const { Router } = require('express')
const commentRoutes = Router()
const { commentController } = require('../controllers')

commentRoutes.get('/', commentController.getAllComments)
commentRoutes.get('/:id', commentController.getCommentById)
commentRoutes.post('/', commentController.createComment)
commentRoutes.put('/:id', commentController.updateComment)
commentRoutes.delete('/:id', commentController.deleteCommentById)

module.exports = commentRoutes
