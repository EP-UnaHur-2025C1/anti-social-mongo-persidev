const { Image } = require('../db/models')

const getImages = async (_, res) => {
  const data = await Image.findAll({})
  res.status(200).json(data)
}

const getImageById = async (req, res) => {
  const data = await Image.findByPk(req.params.id)
  res.status(200).json(data)
}

const createImage = async (req, res) => {
  const newImage = req.body
  const imageCreated = await Image.create(newImage)
  res.status(201).json(imageCreated)
}

const deleteImageById = async (req, res) => {
  const id = req.params.id
  const image = await Image.findByPk(id)
  await image.destroy()
  res.status(200).json({ message: 'Imagen eliminada correctamente' })
}

module.exports = { getImages, getImageById, deleteImageById, createImage }
