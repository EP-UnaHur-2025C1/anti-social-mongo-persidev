const { Comment } = require('../db/models')

const getAllComments = async (_, res) => {
  const data = await Comment.findAll({})
  res.status(200).json(data)
}

const getCommentById = async (req, res) => {
  const data = await Comment.findByPk(req.params.id)
  res.status(200).json(data)
}

const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body)
    res.status(201).json(newComment)
  } catch (e) {
    res.status(400).json({ error: e })
  }
}

const updateComment = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id)
  comment.content = req.body.content
  await comment.save()
  res.status(200).json(comment)
}

const deleteCommentById = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id)
  const removed = await comment.destroy()
  res.status(200).json(removed)
}

module.exports = { getAllComments, getCommentById, createComment, updateComment, deleteCommentById }
