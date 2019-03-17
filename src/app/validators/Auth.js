const Joi = require('joi')

const authenticate = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
}

module.exports = {
  authenticate
}
