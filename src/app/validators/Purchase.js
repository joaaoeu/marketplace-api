const Joi = require('joi')

const create = {
  body: {
    ad: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')
      .required(),
    message: Joi.string().required()
  }
}

module.exports = {
  create
}
