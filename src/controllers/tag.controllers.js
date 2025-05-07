const { Tag } = require('../db/models');

const getTags = async(req, res) => {
  const data= await Tag.findAll({});
  res.status(200).json({ data })
};

const getTagById = async (req, res) => {
  const data = await Tag.findByPk(req.params.id);
  res.status(200).json(data);
};

const createTag = async(req, res) => {
  try{
    const newTag= await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const updateTagById = async (req, res) => {
  const id= req.params.id;
  const newDescription = req.body.description
  const tagToUpdate = await Tag.findByPk(id)
  tagToUpdate.description = newDescription
  await tagToUpdate.save()
  res.status(200).json(tagToUpdate)
};

const deleteTagById = async (req, res) => {
  const data = await Tag.findByPk(req.params.id);
  const removed = await data.destroy();
  res.status(200).json(removed);
};

// Exportacion de todas las funciones
module.exports = { getTags, createTag, getTagById, deleteTagById, updateTagById}