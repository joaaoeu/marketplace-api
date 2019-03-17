const Joi = require('joi')

const create = {
  body: {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  }
}

module.exports = {
  create
}
