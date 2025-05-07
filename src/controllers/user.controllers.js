const { User } = require('../db/models')

// Getters
const getUsers = async (req, res) => {
  const users = await User.findAll()
  res.json({ users })
}
const getUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id)
  res.json(user)
}

// Post
const createUser = async (req, res) => {
  const { nickName, email } = req.body
  const userCreated = await User.create({ nickName, email })
  res.json(userCreated)
}

// Put
const editUser = async (req, res) => {
  const { id } = req.params
  const { nickName, email } = req.body
  const userEdite = await User.findByPk(id)
  userEdite.nickName = nickName
  userEdite.email = email
  await userEdite.save()
  res.json(userEdite)
}

// Delete
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const userDeleted = await User.delete(id)
    res.json({ userDeleted })
  } catch (error) {
    console.log('Error en el servidor al intentar eliminar el usuario', error)
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

// Exportacion de todas las funciones
module.exports = { getUsers, createUser, getUser, editUser, deleteUser }
