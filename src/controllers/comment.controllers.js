const { Comment } = require('../db/models')
const redisClient = require('../cache/redis')

const getAllComments = async (_, res) => {
  try {
    const data = await Comment.find({})
    redisClient.set('all_comments', JSON.stringify(data), { EX: process.env.TTL })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor al intentar obtener los comentarios', error })
  }
}

const getCommentById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Comment.findById(id)
    redisClient.set(`comment-${id}`, JSON.stringify(data), { EX: process.env.TTL })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor al obtener un comentario por ID', error })
  }
}

const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body)
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor al crear un comentario', error })
  }
}

const updateComment = async (req, res) => {
  try {
    const _id = req.params.id
    const commentUpdated = await Comment.findOneAndUpdate({ _id }, req.body, { new: true })
    res.status(200).json(commentUpdated)
  } catch (error) {
    res.status(404).json({ message: 'Error al actualizar el comentario', error })
  }
}

const deleteCommentById = async (req, res) => {
  try {
    const commentRemoved = await Comment.findOneAndDelete({ _id: req.params.id })
    res.status(200).json(commentRemoved)
  } catch (error) {
    res.status(404).json({ message: 'Comentario no encontrado', error })
  }
}

module.exports = { getAllComments, getCommentById, createComment, updateComment, deleteCommentById }
