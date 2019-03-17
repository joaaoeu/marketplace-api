const User = require('../models/User')

class UserController {
  async create (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email is already taken' })
    }

    const user = await User.create(req.body)

    return res.status(201).json(user)
  }
}

module.exports = new UserController()
