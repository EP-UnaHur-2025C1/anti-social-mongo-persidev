// Importacion de mongoose
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:admin123@localhost:27017/db_anti-social?authSource=admin'
// Funcion para conectar a DB-MONGO
const connectMongoose = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Conexion exitosa con BD Mongo')
  } catch (error) {
    console.log('Error al conectar con MongoDB', error)
  }
}

// Exportacion
module.exports = { connectMongoose }
