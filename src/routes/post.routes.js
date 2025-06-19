const { Router } = require("express");
const { Post, User } = require("../db/models");
const { postControllers } = require("../controllers");
const { genericMiddlewares, postMiddlewares } = require("../middlewares");
const { postSchema, tagSchema } = require("../schemas");
const postRoutes = Router();

// Metodos
// Get
postRoutes.get("/", postControllers.getPosts);

postRoutes.get(
  "/:id",
  genericMiddlewares.existID(Post),
  postControllers.getPostByPk
);

// Post
postRoutes.post(
  "/",
  genericMiddlewares.checkIdInModel(User, "UserId"),
  genericMiddlewares.validatorSchema(postSchema),
  postControllers.createPost
);

postRoutes.post(
  "/:id",
  genericMiddlewares.existID(Post),
  genericMiddlewares.validatorSchema(tagSchema),
  postControllers.createTagPost
);

// Put
postRoutes.put(
  "/:id",
  genericMiddlewares.validatorSchema(postSchema),
  genericMiddlewares.existID(Post),
  postControllers.editPost
);

postRoutes.put("/:id/images/:imgId", postControllers.editPostImage);

// Delete
postRoutes.delete(
  "/:id",
  genericMiddlewares.existID(Post),
  postControllers.deletePost
);

postRoutes.delete("/:id/images/:imgId", postControllers.deletePostImage);

postRoutes.delete("/:postId/tag/:tagId",postControllers.deleteTagPost);

// Exportacion
module.exports = postRoutes;
