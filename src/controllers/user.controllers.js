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
  const userCreated = User.create({ nickName, email })
  res.json(userCreated)
}

// Exportacion de todas las funciones
module.exports = { getUsers, createUser, getUser }
