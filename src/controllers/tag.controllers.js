const { Tag } = require('../db/models')
const redisClient = require('../cache/redis')

// Get para todos los tag
const getTags = async (_, res) => {
  try {
    const data = await Tag.find()
    redisClient.set('all_tags', JSON.stringify(data), { EX: process.env.TTL })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get para ver un tag por id
const getTagById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Tag.findById(id)
    if (!data) {
      return res.status(404).json({ message: 'No se encontro la etiqueta' })
    }
    redisClient.set(`tag-${id}`, JSON.stringify(data), { EX: process.env.TTL })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Post para crear un tag
const createTag = async (req, res) => {
  try {
    const nuevoTag = new Tag(req.body)
    await nuevoTag.save()
    res.status(201).json(nuevoTag)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Put para modificar un tag
const updateTagById = async (req, res) => {
  try {
    const tagToUpdate = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!tagToUpdate) {
      return res.status(404).json({ mensaje: 'Etiqueta no encontradada' })
    }
    res.json({ mensaje: 'Etiqueta actualizadada', description: tagToUpdate })
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la etiqueta', error })
  }
}

// Delete
const deleteTagById = async (req, res) => {
  try {
    const data = await Tag.findByIdAndDelete(req.params.id)
    if (!data) {
      return res.status(404).json({ mensaje: 'Etiqueta no encontrada' })
    }
    res.json({ mensaje: 'Etiqueta eliminada', description: data })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la etiqueta', error })
  }
}

// // Get para ver los posts que tienen el tag del id x
// const verPosts = async (req, res) => {
//   const { id } = req.params
//   const tag = await Tag.findByPk(id)
//   const posts = await tag.getPosts({ joinTableAttributes: [] })
//   res.status(200).json(posts)
// }

// Exportacion de todas las funciones
module.exports = { getTags, createTag, getTagById, deleteTagById, updateTagById /* verPosts */ }
