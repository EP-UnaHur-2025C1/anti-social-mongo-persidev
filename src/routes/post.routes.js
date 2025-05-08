const { Router } = require('express')
const { Post } = require('../db/models')
const { postControllers } = require('../controllers')
const { genericMiddlewares } = require('../middlewares')
const postRoutes = Router()

// Metodos
//Get
postRoutes.get('/', postControllers.getPosts)

postRoutes.get('/:id',
    genericMiddlewares.existID(Post),
    genericMiddlewares.validateID(Post),
    postControllers.getPostByPk
)

//Post
postRoutes.post('/', postControllers.createPost)

//Put
postRoutes.put('/:id', 
    genericMiddlewares.existID(Post),
    genericMiddlewares.validateID(Post),
    postControllers.editPost
)

//Delete
postRoutes.delete('/:id', 
    genericMiddlewares.existID(Post),
    genericMiddlewares.validateID(Post),
    postControllers.deletePost
)

// Exportacion
module.exports = postRoutes
