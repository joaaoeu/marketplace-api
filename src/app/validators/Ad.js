const Joi = require('joi')

const list = {
  query: {
    includePurchased: Joi.boolean(),
    page: Joi.number(),
    pageSize: Joi.number(),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
    title: Joi.string()
  }
}

const create = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
  }
}

const update = {
  body: {
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number()
  }
}

module.exports = {
  list,
  create,
  update
}
