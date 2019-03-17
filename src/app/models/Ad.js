const mongoose = require('mongoose')

const AdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

AdSchema.options.toJSON = {
  transform: function (adDocument) {
    const ad = adDocument.toJSON({ transform: false })
    delete ad.__v
    return ad
  }
}

module.exports = mongoose.model('Ad', AdSchema)
