const express = require('express')
const db = require('./db/models')
// Accedo a la variable de entorno si existe
require('dotenv').config()

// Obtengo el puerto
const PORT = process.env.PORT || 3001

// Creo la instancia de mi aplicacion
const app = express()

// Configuro para poder pasar json por el body
app.use(express.json())

// Listo mi aplicacion al puerto
app.listen(PORT, async () => {
  // await db.sequelize.sync({ force: true })
  console.log(`Aplicacion corriendo en el puerto ${PORT}`)
})
// Exporto mi aplicacion
module.exports = app
