const { Post, Image, Comment, PostTag } = require("../db/models");

// Getters
const getPosts = async (_, res) => {
  const posts = await Post.findAll({
    include: [
      {
        model: Image,
        attributes: ["url", "id"],
      },
      {
        model: Comment,
        attributes: ["content", "publicationDate"],
        required: false,
      } /* ,
      {
        model: PostTag,
        attributes: ["TagId"],        <---- Asociar tabla intermedia
        required: false,
      }, */,
    ],
  }); // status
  const postsFiltered = posts.map((post) => {
    const visibleComments = post.Comments?.filter((c) => c.isVisible);
    const postJSON = post.toJSON();
    postJSON.Comments = visibleComments;
    return postJSON;
  });

  res.status(200).json({ posts: postsFiltered });
};

const getPostByPk = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id); // status
  res.status(200).json(post);
};

// Post
const createPost = async (req, res) => {
  try {
    const { description, UserId } = req.body;
    const postCreated = await Post.create({ description, UserId });
    const { images } = req.body;
    if (images && images.length > 0) {
      images.forEach(async (img) => {
        const imageNew = await Image.create({
          PostId: postCreated.id,
          url: img.url,
        });
      });
    }
    const fullPost = await Post.findByPk(postCreated.id, {
      include: [
        {
          model: Image,
          attributes: ["url", "id"],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

// Put
const editPost = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const postEdite = await Post.findByPk(id);
  postEdite.description = description;
  await postEdite.save();
  res.json(postEdite);
};

const editPostImage = async (req, res) => {
  const { id, imgId } = req.params;
  const { images } = req.body;
  const image = await Image.findByPk(imgId);
  if (image && image.PostId == id) {
    image.url = images[0].url;
    await image.save();
  }
  const postUpdated = await Post.findByPk(id, {
    include: [
      {
        model: Image,
        attributes: ["url", "id"],
      },
    ],
  });
  res.status(200).json(postUpdated);
};

// Delete
const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  const removed = await post.destroy();
  res.json(removed);
};

const deletePostImage = async (req, res) => {
  const { id, imgId } = req.params;
  const image = await Image.findByPk(imgId);
  if (image && image.PostId == id) {
    await image.destroy();
  }
  const postUpdated = await Post.findByPk(id, {
    include: [
      {
        model: Image,
        attributes: ["url", "id"],
      },
    ],
  });
  res.status(200).json(postUpdated);
};

// Exportacion de todas las funciones
module.exports = {
  getPosts,
  getPostByPk,
  createPost,
  editPost,
  editPostImage,
  deletePost,
  deletePostImage,
};
