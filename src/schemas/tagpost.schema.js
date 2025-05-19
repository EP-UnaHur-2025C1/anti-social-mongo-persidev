const Joi = require("joi");

const postTagSchema = Joi.object({
  postId: Joi.number().integer().required(),
  tagId: Joi.number().integer().required(),
});

module.exports = {
  postTagSchema,
};
