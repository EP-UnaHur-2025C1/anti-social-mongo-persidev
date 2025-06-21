const redisClient = require('../cache/redis.js')

const checkCache = (name) => {
  return async (req, res, next) => {
    const id = req.params.id ?? -1
    const data = await redisClient.get(`${name}-${id}`)
    if (data) {
      return res.status(200).json(JSON.parse(data))
    }
    next()
  }
}

const deleteCache = (name) => {
  return async (req, _, next) => {
    const id = req.params.id ?? -1
    await redisClient.del(`${name}-${id}`)
    next()
  }
}

module.exports = { checkCache, deleteCache }
