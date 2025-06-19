const { Image } = require('../db/models')

const getImages = async (_, res) => {
  try {
    const data = await Image.find()
    res.status(200).json(data)
  } catch (error) {
    console.error(`Error al obtener las imágenes: ${error}`)
    res
      .status(500)
      .json({ message: 'Error en el servidor al obtener las imágenes' })
  }
}

const getImageById = async (req, res) => {
  try {
    const data = await Image.findById(req.params.id)
    res.status(200).json(data)
  } catch (error) {
    console.error(`Error al obtener la imagen: ${error}`)
    res
      .status(500)
      .json({ message: 'Error en el servidor al obtener la imagen' })
  }
}

const createImage = async (req, res) => {
  try {
    const newImage = req.body
    const imageCreated = await Image.create(newImage)
    res.status(201).json(imageCreated)
  } catch (error) {
    console.error(`Error al crear la imagen: ${error}`)
    res
      .status(500)
      .json({ message: 'Error en el servidor al crear la imagen' })
  }
}

const deleteImageById = async (req, res) => {
  try {
    const _id = req.params.id
    await Image.findOneAndDelete({ _id })
    res.status(200).json({ message: 'Imagen eliminada correctamente' })
  } catch (error) {
    console.error(`Error al eliminar la imagen: ${error}`)
    res
      .status(500)
      .json({ message: 'Error en el servidor al eliminar la imagen' })
  }
}

module.exports = { getImages, getImageById, deleteImageById, createImage }
