const { Router } = require('express')
const postTagsRoutes = Router()
const { postTagControllers } = require('../controllers/')

postTagsRoutes.post('/', postTagControllers.createTagPost)
postTagsRoutes.delete('/', postTagControllers.deleteTagPost)
postTagsRoutes.get('/post/:idPost', postTagControllers.getTagsOfPost)

module.exports = postTagsRoutes
