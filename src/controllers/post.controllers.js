const { Post } = require('../db/models')

// Getters
const getPosts = async (_, res) => {
  const posts = await Post.findAll()
  res.json({ posts })
}

const getPostByPk = async (req, res) => {
  const id = req.params.id
  const post = await Post.findByPk(id)
  res.json(post)
}

// Post
const createPost = async (req, res) => {
  const newPost = req.body
  const postCreated = await Post.create(newPost)
  res.json(postCreated)
}

// Put
const editPost = async (req, res) => {
  const { id } = req.params
  const { description } = req.body
  const postEdite = await Post.findByPk(id)
  postEdite.description = description
  await postEdite.save()
  res.json(postEdite)
}

// Delete
const deletePost = async (req, res) => {
  const id = req.params.id
  const post = await Post.findByPk(id)
  const removed = await post.destroy()
  res.json(removed)
}

// http://localhost:3001/posts/1

// Exportacion de todas las funciones
module.exports = { getPosts, getPostByPk, createPost, editPost, deletePost }
