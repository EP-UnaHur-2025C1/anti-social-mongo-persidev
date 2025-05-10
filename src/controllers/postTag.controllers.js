const { PostTag } = require('../db/models')
const { Post } = require('../db/models')
const { Tag } = require('../db/models')
const createTagPost = async (req, res) => {
  const data = req.body
  const c = await PostTag.create(data)
  res.json(c)
}
const deleteTagPost = () => {}
const getTagsOfPost = async (req, res) => {
  const { idPost } = req.params
  const post = await Post.findByPk(idPost)
  const tags = await post.getTags({
    include: {
      model: Tag,
      attributes: ['description']
    }
  }
  )
  res.json(tags)
}
module.exports = {
  createTagPost,
  deleteTagPost,
  getTagsOfPost
}
