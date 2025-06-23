const express = require('express')
const openapiSpecification = require('./docs/swagger.js')
const swaggerUI = require('swagger-ui-express')
const { connectMongoose } = require('./db/config/db.js')
const redisClient = require('./cache/redis.js')

// Accedo a la variable de entorno si existe
require('dotenv').config()

// Obtengo el puerto
const PORT = process.env.PORT || 3000

// Creo la instancia de mi aplicacion
const app = express()

// Configuraciones necesarias
app.use(express.json())
app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(openapiSpecification))

// Listo mi aplicacion al puerto
app.listen(PORT, async () => {
  await connectMongoose()
  await redisClient.connect()
  console.log(`Aplicacion corriendo en el puerto http://localhost:${PORT}`)
})

// Exporto mi aplicacion
module.exports = app
