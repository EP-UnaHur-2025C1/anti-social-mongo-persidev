const { Router } = require("express");
const postTagsRoutes = Router();
const { postTagControllers } = require("../controllers/");
const { genericMiddlewares } = require("../middlewares");
const { postTagSchema } = require("../schemas");

// Get
postTagsRoutes.get(
  "/post/:postId",
  genericMiddlewares.existID("postId"),
  genericMiddlewares.validateID("postId"),
  postTagControllers.getTagsOfPost
);

// Post
postTagsRoutes.post(
  "/",
  genericMiddlewares.validatorSchema(postTagSchema),
  postTagControllers.createTagPost
);

// Delete
postTagsRoutes.delete(
  "/post/:postId/tag/:tagId",
  genericMiddlewares.existID("postId"),
  genericMiddlewares.existID("tagId"),
  genericMiddlewares.validateID("postId"),
  genericMiddlewares.validateID("tagId"),
  postTagControllers.deleteTagPost
);

module.exports = postTagsRoutes;
