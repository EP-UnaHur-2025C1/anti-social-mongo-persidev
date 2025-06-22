const genericMiddlewares = require('./generic.middlewares')
const userMiddlewares = require('./user.middlewares')
const tagMiddlewares = require('./tag.middlewares')
const cacheMiddlewares = require('./redis.middlewares')

module.exports = {
  genericMiddlewares,
  userMiddlewares,
  tagMiddlewares,
  cacheMiddlewares
}
