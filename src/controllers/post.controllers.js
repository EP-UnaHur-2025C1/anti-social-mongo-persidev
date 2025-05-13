const { Post, Image, Comment } = require('../db/models')
const { createImage } = require('./image.controllers')

// Getters
const getPosts = async (_, res) => {
  const posts = await Post.findAll({
    include: [{
      model: Image,
      attributes: ['url', 'id']
    }]
  }) //status
  res.json({ posts })
}

const getPostByPk = async (req, res) => {
  const id = req.params.id
  const post = await Post.findByPk(id) //status
  res.json(post)
}

const getPostByIdWithComments = async (req, res) => {
  const postId = req.params.id
  const post = await Post.findOne({
    where: { id: postId },
    include: [{
      model: Comment,
      attributes: ['content', 'publicationDate'],
      required: false
    }]
  })
  const visibleComments = post.Comments?.filter(c => c.get('isVisible'))
  const postWithComments = post.toJSON()
  postWithComments.Comments = visibleComments

  res.status(200).json(postWithComments)
}

// Post
const createPost = async (req, res) => {
  const { description, UserId } = req.body
  console.log(description, UserId)
  const postCreated = await Post.create({description, UserId})
  const { images } = req.body
  images.forEach(async img => {
    const imageNew = await Image.create({
      PostId: postCreated.id,
      url: img.url
    })
    console.log(imageNew)
  })
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
module.exports = { getPosts, getPostByPk, createPost, editPost, deletePost, getPostByIdWithComments }
