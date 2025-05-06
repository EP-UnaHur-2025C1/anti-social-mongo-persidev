const { User } = require('../db/models')

const existNickName = async (req, res, next) => {
  try {
    const { nickName } = req.body
    const userExist = await User.findOne({ where: { nickName } })
    if (userExist) return res.status(400).json({ message: 'Ya existe el nicknmae' })
    next()
  } catch (error) {
    console.log(`Error verificando el NickName : ${error}`)
    res.status(500).json({ message: 'Error al del servidor verificando el nickName', error })
  }
}

const existEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    const emailExist = await User.findOne({ where: { email } })
    if (emailExist) return res.status(400).json({ message: 'Mail existente' })
    next()
  } catch (error) {
    console.log(`Error verificando el correo : ${error}`)
    res.status(500).json({ message: 'Error al del servidor verificando el correo', error })
  }
}

module.exports = { existNickName, existEmail }
