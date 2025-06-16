const mongoose = require("mongoose");
const user = require("./user");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "La descripción del posteo es requerida"],
    minLength: [1, "El posteo debe tener una longitud minima de 1 caracter"],
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

// Exportacion
module.exports = mongoose.model("Post", postSchema);
