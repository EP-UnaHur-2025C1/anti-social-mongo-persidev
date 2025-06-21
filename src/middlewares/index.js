const genericMiddlewares = require('./generic.middlewares')
const userMiddlewares = require('./user.middlewares')
const postMiddlewares = require('./post.middlewares')
const tagMiddlewares = require('./tag.middlewares')
const cacheMiddlewares = require('./redis.middlewares')

module.exports = {
  genericMiddlewares,
  postMiddlewares,
  userMiddlewares,
  tagMiddlewares,
  cacheMiddlewares
}
