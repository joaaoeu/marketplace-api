const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const AdSchema = new mongoose.Schema(
  {
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
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Purchase'
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

AdSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Ad', AdSchema)
