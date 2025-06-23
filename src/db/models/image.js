const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      require: true
    },
    PostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  }
)

imageSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.__v
  }
})

module.exports = mongoose.model('Image', imageSchema)
