const { Post, Image, Comment, Tag, User } = require("../db/models");

// Getters
const getPosts = async (_, res) => {
  try {
    const posts = await Post.find().populate([
      { path: "comments" },
      { path: "tags" },
      { path: "images" },
    ]);
    const postsFiltered = posts.map((post) => {
      const visibleComments = post.comments?.filter(
        (comment) => comment.isVisible
      );
      post.comments = visibleComments;
      return post;
    });
    res.status(200).json({ posts: postsFiltered });
  } catch (error) {
    console.error(`Error al obtener los posts: ${error}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

const getPostByPk = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate([
      { path: "UserId" },
      { path: "comments" },
      { path: "tags" },
      { path: "images" },
    ]);
    res.status(200).json(post);
  } catch (error) {
    console.error(`Error al obtener el post: ${error}`);
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

// Post
const createPost = async (req, res) => {
  try {
    const { description, UserId, images } = req.body;

    const existingUser = await User.findById(UserId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "El usuario con el ID proporcionado no existe." });
    }
    const postCreated = await Post.create({ description, UserId });

    const imageIds = [];

    if (images && images.length > 0) {
      await Promise.all(
        images.map(async (img) => {
          const newImage = await Image.create({
            PostId: postCreated._id,
            url: img.url,
          });
          imageIds.push(newImage._id);
        })
      );
    }
    postCreated.images = imageIds;
    await postCreated.save();

    const fullPost = await Post.findById(postCreated._id).populate(
      "images",
      "url"
    );

    res.status(200).json(fullPost);
  } catch (error) {
    console.error(`Error al crear el post: ${error}`);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

// Put
const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const postEdite = await Post.findOneAndUpdate(
      { _id: id },
      { $set: { description } },
      { new: true }
    );
    res.status(200).json(postEdite);
  } catch (error) {
    console.error(`Error al editar el post: ${error}`);
    res.status(500).json({ error: "Error al editar el post" });
  }
};

const editPostImage = async (req, res) => {
  try {
    const { id, imgId } = req.params;
    const { images } = req.body;

    const image = await Image.findById(imgId);

    if (!image) {
      return res.status(404).json({
        message: "No se encontró la imagen con ese ID",
        id: imgId,
      });
    }

    if (image.PostId != id) {
      return res.status(404).json({
        message: "La imagen no pertenece al post especificado",
        imagePostId: image.PostId,
        requestedPostId: id,
      });
    }

    image.url = images[0].url;
    await image.save();

    const postUpdated = await Post.findById(id).populate("images");

    res.status(200).json(postUpdated);
  } catch (error) {
    console.error(`Error al editar la imagen del post: ${error}`);
    res.status(500).json({ error: "Error al editar la imagen del post" });
  }
};

// Delete
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const postRemoved = await Post.findOneAndDelete({ _id: id });
    res.status(200).json(postRemoved);
  } catch (error) {
    console.error(`Error al eliminar el post: ${error}`);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};

const deletePostImage = async (req, res) => {
  try {
    const { id, imgId } = req.params;
    const image = await Image.findById(imgId);
    if (image && image.PostId == id) {
      await image.deleteOne({_id: id});
    }
    const postUpdated = await Post.findById(id).populate('images')
    res.status(200).json(postUpdated);
  } catch (error) {
    console.error(`Error al eliminar la imagen del post: ${error}`);
    res.status(500).json({ error: "Error al eliminar la imagen del post" });
  }
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
