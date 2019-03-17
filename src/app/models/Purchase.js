const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ad',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toObject: {
      transform: function (doc, ad) {
        delete ad.__v
      }
    },
    toJSON: {
      transform: function (doc, ad) {
        delete ad.__v
      }
    }
  }
)

module.exports = mongoose.model('Purchase', PurchaseSchema)
