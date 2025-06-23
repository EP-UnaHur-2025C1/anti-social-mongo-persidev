const { Tag } = require('../db/models')

// Verifica si el tag recibido ya existe
const existTag = async (req, res, next) => {
  try {
    const { description } = req.body
    const descriptionExist = await Tag.findOne({ description })
    if (descriptionExist) return res.status(400).json({ message: 'Ya existe el tag' })
    next()
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({ error })
  }
}

module.exports = { existTag }
