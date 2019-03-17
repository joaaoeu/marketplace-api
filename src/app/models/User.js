const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
  comparePasswords (password) {
    return bcrypt.compare(password, this.password)
  }
}

UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

UserSchema.options.toJSON = {
  transform: function (userDocument) {
    const user = userDocument.toJSON({ transform: false })
    delete user.password
    delete user.__v
    return user
  }
}

module.exports = mongoose.model('User', UserSchema)
