const { Router } = require('express')
const { userControllers } = require('../controllers')
const { User } = require('../db/models')
const { genericMiddlewares, userMiddlewares } = require('../middlewares')

const userRoutes = Router()

// Metodos
userRoutes.get('/', userControllers.getUsers)

userRoutes.get('/:id',
  genericMiddlewares.validateID(User),
  genericMiddlewares.existID(User),
  userControllers.getUser
)

userRoutes.post('/',
  userMiddlewares.existNickName,
  userMiddlewares.existEmail,
  userControllers.createUser
)
userRoutes.put('/:id',
  genericMiddlewares.validateID(User),
  genericMiddlewares.existID(User),
  userMiddlewares.existNickName,
  userMiddlewares.existEmail,
  userControllers.editUser
)

// Exportacion
module.exports = userRoutes
