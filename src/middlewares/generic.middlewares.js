const existID = (model) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params
      const existID = await model.findByPk(id)
      if (!existID) return res.status(404).json({ message: 'No se encontró el id ', id })
      next()
    } catch (error) {
      console.error('Error al consultar por la ID', error)
      res.status(500).json({ message: 'Error en el servidor al consultar por la id', error })
    }
  }
}

const validateId = (req, res, next) => {
  const id = req.params.id
  if (id <= 0) {
    return res.status(400).json({ message: `Bad Request: invalid id ${id}` })
  }
  next()
}

const schemaValidator = (schema) => {
  return (req, res, next) => {
    const { error, _ } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const errores = error.details.map(e => { return { attribute: e.path[0], message: e.message, typeError: e.type } })
      return res.status(400).json(errores)
    }
    next()
  }
}

module.exports = { existID, validateId, schemaValidator }
