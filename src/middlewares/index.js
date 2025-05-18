const genericMiddlewares = require("./generic.middlewares");
const userMiddlewares = require("./user.middlewares");
const postMiddlewares = require("./post.middlewares");
const tagMiddlewares = require("./tag.middlewares");
const imageMiddlewares = require("./image.middleware");

module.exports = {
  genericMiddlewares,
  postMiddlewares,
  userMiddlewares,
  tagMiddlewares,
  imageMiddlewares,
};
