const { Post, Image, User, Tag, Comment } = require('../db/models')
const redisClient = require('../cache/redis')

// Trae el posteo con comentarios, tags e imagenes
const postFull = async (postId) => {
  try {
    const post = await Post.findById(postId)
    if (!post) return null

    const comments = await Comment.find({ PostId: postId })
    const tags = await Tag.find({ posts: postId })
    const images = await Image.find({ PostId: postId })

    const visibleComments = comments.filter((comment) => comment.isVisible)

    return {
      ...post.toObject(),
      comments: visibleComments,
      tags,
      images
    }
  } catch (error) {
    console.error(`Error en postFull(${postId}):`, error)
    return null
  }
}

// Getters
const getPosts = async (_, res) => {
  try {
    const posts = await Post.find()

    const postsFull = await Promise.all(
      posts.map((post) => postFull(post._id))
    )

    redisClient.set('all_posts', JSON.stringify(postsFull), { EX: process.env.TTL })

    res.status(200).json({ posts: postsFull })
  } catch (error) {
    console.error('Error al obtener los posteos', error)
    res.status(500).json({
      message: 'Error en el servidor al solicitar los posteos',
      error
    })
  }
}

const getPostByPk = async (req, res) => {
  try {
    const id = req.params.id
    const post = await postFull(id)
    redisClient.set(`post-${id}`, JSON.stringify(post), { EX: process.env.TTL })
    res.status(200).json({ post })
  } catch (error) {
    console.error('Error al obtener el posteo', error)
    res.status(500).json({
      message: 'Error en el servidor al solicitar el posteo',
      error
    })
  }
}

// Post
const createPost = async (req, res) => {
  try {
    const { description, UserId, images } = req.body

    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: 'El usuario con el ID proporcionado no existe.' })
    }
    const postCreated = await Post.create({ description, UserId })

    const imageIds = []

    if (images && images.length > 0) {
      await Promise.all(
        images.map(async (img) => {
          const newImage = await Image.create({
            PostId: postCreated._id,
            url: img.url
          })
          imageIds.push(newImage._id)
        })
      )
    }
    postCreated.images = imageIds
    await postCreated.save()
    await User.findByIdAndUpdate(UserId, {
      $push: { posts: postCreated._id }
    })
    const fullPost = await Post.findById(postCreated._id).populate(
      'images',
      'url'
    )

    res.status(200).json(fullPost)
  } catch (error) {
    console.error('Error al crear el posteo', error)
    res.status(500).json({
      message: 'Error en el servidor al crear el posteo',
      error
    })
  }
}

const createTagPost = async (req, res) => {
  try {
    const data = req.body
    const postId = req.params.id

    const tag = await Tag.create(data)

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { tags: tag._id } },
      { new: true }
    )
    await Tag.findByIdAndUpdate(tag._id, { $push: { posts: post._id } })
    const fullPost = await postFull(postId)
    res.status(200).json({ post: fullPost })
  } catch (error) {
    console.log('Error en el servidor al intentar crear la etiqueta', error)
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

// Put
const editPost = async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    await Post.findOneAndUpdate(
      { _id: id },
      { $set: { description } },
      { new: true }
    )
    const post = await postFull(id)
    res.status(200).json(post)
  } catch (error) {
    console.error('Error al editar el posteo', error)
    res.status(500).json({
      message: 'Error en el servidor al editar el posteo',
      error
    })
  }
}

const editPostImage = async (req, res) => {
  try {
    const { id, imgId } = req.params
    const { images } = req.body

    const image = await Image.findById(imgId)

    if (!image) {
      return res.status(404).json({
        message: 'No se encontró la imagen con ese ID',
        id: imgId
      })
    }

    if (image.PostId !== id) {
      return res.status(404).json({
        message: 'La imagen no pertenece al post especificado',
        imagePostId: image.PostId,
        requestedPostId: id
      })
    }

    image.url = images[0].url
    await image.save()

    const postUpdated = await postFull(id)

    res.status(200).json(postUpdated)
  } catch (error) {
    console.error('Error al editar la imagen de un posteo', error)
    res.status(500).json({
      message: 'Error en el servidor al editar la imagen de un posteo',
      error
    })
  }
}

// Delete
const deletePost = async (req, res) => {
  try {
    const id = req.params.id
    const postRemoved = await Post.findOneAndDelete({ _id: id })
    res.status(200).json(postRemoved)
  } catch (error) {
    console.error('Error al eliminar el posteo', error)
    res.status(500).json({
      message: 'Error en el servidor al eliminar el posteo',
      error
    })
  }
}

const deletePostImage = async (req, res) => {
  try {
    const { id, imgId } = req.params
    const image = await Image.findById(imgId)
    if (image && image.PostId === id) {
      await image.deleteOne({ _id: id })
    }
    res.status(200).json(image)
  } catch (error) {
    console.error('Error al eliminar la imagen de un posteo', error)
    res.status(500).json({
      message: 'Error en el servidor al eliminar la imagen de un posteo',
      error
    })
  }
}

const deleteTagPost = async (req, res) => {
  try {
    const { postId, tagId } = req.params
    const post = await Post.findById(postId)
    const tag = await Tag.findById(tagId)
    if (!post) {
      return res
        .status(404)
        .json({ message: 'No se encontro el posteo con id ' + postId })
    }
    if (!tag) {
      return res
        .status(404)
        .json({ message: 'No se encontro el tag con id ' + tagId })
    }
    await Post.findByIdAndUpdate(postId, { $pull: { tags: tagId } })
    await tag.deleteOne()

    res.status(200).json(tag)
  } catch (error) {
    console.log(
      'Error en el servidor al intentar eliminar la etiqueta de un posteo',
      error
    )
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

// Exportacion de todas las funciones
module.exports = {
  getPosts,
  getPostByPk,
  createPost,
  createTagPost,
  editPost,
  editPostImage,
  deletePost,
  deletePostImage,
  deleteTagPost
}
