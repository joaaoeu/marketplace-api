const Youch = require('youch')
const validate = require('express-validation')

module.exports = isDev => {
  return async (err, req, res, next) => {
    if (err instanceof validate.ValidationError) {
      return res.status(err.status).json(err)
    }

    if (isDev) {
      const youch = new Youch(err, req)
      return res.status(err.status || 500).json(await youch.toJSON())
    }

    return res
      .status(err.status || 500)
      .json({ error: 'Internal Server Error.' })
  }
}
