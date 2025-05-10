const Joi = require('joi')

const schema = Joi.object({
  content: Joi.string().required().trim().min(1).max(60).messages({
    'any.required': 'content is required',
    'string.min': 'content must contain at least {#limit} character',
    'string.max': 'content must contain a maximum of {#limit} characters',
    'string.empty': 'content cannot be empty'
  }),
  UserId: Joi.number(),
  PostId: Joi.number()
})

module.exports = schema
