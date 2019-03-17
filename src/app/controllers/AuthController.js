const User = require('../models/User')

class AuthController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || !(await user.comparePasswords(password))) {
      return res.status(400).json({ error: 'Incorrect email or password.' })
    }

    return res.status(200).json({ user, token: User.generateToken(user) })
  }
}

module.exports = new AuthController()
