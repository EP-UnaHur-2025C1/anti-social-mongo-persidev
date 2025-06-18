const { User } = require('../db/models')

// Getters --------------------------------------------
const getUsers = async (_, res) => {
  try {
    const users = await User.find().populate('posts')
    res.json({ users })
  } catch (error) {
    console.log('Error en el servidor al solicitar los usuarios', error)
    res.status(500).json({ message: 'Error en el servidor al solicitar los usuarios', error })
  }
}
const getUserById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    console.log('Error en el servidor al solicitar el usuario', error)
    res.status(500).json({ message: 'Error en el servidor al solicitar el usuario', error })
  }
}
const getUserByNickName = async (req, res) => {
  try {
    const { nickName } = req.params
    const user = await User.findOne({ nickName }).populate('posts')
    res.json(user)
  } catch (error) {
    console.log('Error en el servidor al solicitar un usuario', error)
    res.status(500).json({ message: 'Error en el servidor al solicitar el usuario', error })
  }
}

const getUserWithPosts = async (req, res) => {
  try {
    const { id } = req.params
    const userFind = await User.findById(id).populate('posts')
    // const posts = await Post.find({ UserId: id })
    // userFind.posts = posts
    res.json(userFind)
  } catch (error) {
    console.log('Error en el servidor al solicitar un usuario', error)
    res.status(500).json({ message: 'Error en el servidor al solicitar el usuario', error })
  }
}

// Post ------------------------------------------
const createUser = async (req, res) => {
  try {
    const userCreated = await User.create(req.body)
    res.status(201).json(userCreated)
  } catch (error) {
    console.log('Error en el servidor al crear un usuario', error)
    res.status(500).json({ message: 'Error en el servidor al agregar el usuario', error })
  }
}

// Put -----------------------------------------
const editUser = async (req, res) => {
  try {
    const { id } = req.params
    const { nickName, email } = req.body
    const userEdite = await User.updateOne({ _id: id }, { $set: { nickName, email } })
    if (userEdite.modifiedCount === 1) {
      const newUser = await User.findById(id)
      res.json(newUser)
    } else {
      res.status(404).json({ message: 'No se encontro el usuario' })
    }
  } catch (error) {
    console.log('Error en el servidor al editar un usuario', error)
    res.status(500).json({ message: 'Error en el servidor al editar el usuario', error })
  }
}

// Delete ----------------------------------------------
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findById(id)
    if (userDeleted) {
      await User.deleteOne({ _id: id })
      res.json(userDeleted)
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  } catch (error) {
    console.log('Error en el servidor al intentar eliminar el usuario', error)
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

// Exportacion de todas las funciones

module.exports = {
  getUsers,
  getUserById,
  getUserByNickName,
  createUser,
  editUser,
  deleteUser,
  getUserWithPosts
}
