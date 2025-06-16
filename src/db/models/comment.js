const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        publicationDate: {
            type: Date,
            default: Date.now
        }
    }
  )
    
    commentSchema.virtual('isVisible').get(function () {
        const xMonths = process.env.MONTHS || 6
        const yearDifference = new Date().getFullYear() - new Date(this.get('publicationDate')).getFullYear()
        const monthDifference = new Date().getMonth() - new Date(this.get('publicationDate')).getMonth()
        return (yearDifference * 12 + monthDifference) < xMonths 
    })

    commentSchema.set('toJSON', {
        transform: (_, ret) => {
            delete ret.__v
        }
    })

module.exports = mongoose.model('Comment', commentSchema)