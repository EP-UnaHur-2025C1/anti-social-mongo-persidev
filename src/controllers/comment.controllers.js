const { Comment } = require('../db/models')

const getAllComments = async (req, res) => {
  const data = await Comment.findAll({})
  res.status(200).json(data)
}

const getCommentById = async (req, res) => {
  const data = await Comment.findByPk(req.params.id)
  if (data) res.status(200).json(data)
  else res.status(404).json({ message: 'Not found' })
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
  if (comment) {
    comment.content = req.body.content
    await comment.save()
    res.status(200).json(comment)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
}

const deleteCommentById = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id)
  if (comment) {
    const removed = await comment.destroy()
    res.status(200).json(removed)
  } else {
    res.status(404).json({ message: 'comment not found' })
  }
}

module.exports = { getAllComments, getCommentById, createComment, updateComment, deleteCommentById }
