const { Router } = require('express')
const { userControllers } = require('../controllers')
const { User } = require('../db/models')
const { genericMiddlewares, userMiddlewares, cacheMiddlewares } = require('../middlewares')
const { userSchema } = require('../schemas')
const userRoutes = Router()

// Metodos
userRoutes.get('/', cacheMiddlewares.checkCache('all_users'), userControllers.getUsers)

userRoutes.get('/:id',
  cacheMiddlewares.checkCache('user'),
  genericMiddlewares.existID(User),
  userControllers.getUserById
)
userRoutes.get('/nickname/:nickName',
  cacheMiddlewares.checkCache('nickName'),
  userMiddlewares.checkNickNameExists,
  userControllers.getUserByNickName
)
userRoutes.get('/:id/posts',
  cacheMiddlewares.checkCache('userPosts'),
  genericMiddlewares.existID(User),
  userControllers.getUserWithPosts
)

userRoutes.post('/',
  genericMiddlewares.validatorSchema(userSchema),
  userMiddlewares.checkNickNameNotExists,
  userMiddlewares.checkEmailNotExists,
  userControllers.createUser
)
userRoutes.put('/:id',
  genericMiddlewares.validatorSchema(userSchema),
  genericMiddlewares.existID(User),
  userMiddlewares.checkNickNameNotExists,
  userMiddlewares.checkEmailNotExists,
  userControllers.editUser
)
userRoutes.delete('/:id',
  cacheMiddlewares.deleteCache('user'),
  genericMiddlewares.existID(User),
  userControllers.deleteUser
)

// Exportacion
module.exports = userRoutes
