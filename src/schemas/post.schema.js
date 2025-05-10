const Joi = require('joi')

const postSchema = Joi.object({
  description: Joi.string().trim().required().min(1).max(100).messages({
    'any.required': 'Debe contener descripción',
    'string.min': 'La descripción debe tener {#limit} caracteres como minimo',
    'string.max': 'La descripción debe tener {#limit} caracteres como máximo',
    'string.base': 'La descripción tiene que ser un string'
  }),
  UserId: Joi.number()
})

module.exports = postSchema
