const { Image } = require('../db/models')

const getImages = async (_, res) => {
  try {
    const data = await Image.findAll({})
    res.status(200).json(data)
  } catch (error) {
    res.atatus(500).json({ message: 'Error en el servidor al intentar obtener las imagenes', error })
  }
}

const getImageById = async (req, res) => {
  try {
    const data = await Image.findByPk(req.params.id)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: 'Error al intentar obtener una imagen por su ID', error })
  }
}

const createImage = async (req, res) => {
  try {
    const newImage = req.body
    const imageCreated = await Image.create(newImage)
    res.status(201).json(imageCreated)
  } catch (error) {
    res.status(400).json({ message: 'Error en la solicitud', error })
  }
}

const deleteImageById = async (req, res) => {
  try {
    const id = req.params.id
    const image = await Image.findByPk(id)
    await image.destroy()
    res.status(200).json({ message: 'Imagen eliminada correctamente' })
  } catch (error) {
    res.status(404).json({ message: 'Imagen no encontrada', error })
  }
}

module.exports = { getImages, getImageById, deleteImageById, createImage }
