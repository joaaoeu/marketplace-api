const Joi = require('joi')

const idParam = {
  params: {
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')
      .required()
  }
}

module.exports = {
  idParam
}
