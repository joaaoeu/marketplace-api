const express = require('express')
const validate = require('express-validation')
const validators = require('./app/validators')
const middlewares = require('./app/middlewares')
const controllers = require('./app/controllers')

const routes = express.Router()

/** Public routes **/
/** Auth **/
routes.post(
  '/auth',
  validate(validators.Auth.authenticate),
  controllers.AuthController.authenticate
)

/** Users **/
routes.post(
  '/users',
  validate(validators.User.create),
  controllers.UserController.create
)

/** Private routes **/
routes.use(middlewares.auth)

/** Ads **/
routes.get('/ads', validate(validators.Ad.list), controllers.AdController.list)

routes.get(
  '/ads/:id',
  validate(validators.General.idParam),
  controllers.AdController.show
)

routes.post(
  '/ads',
  validate(validators.Ad.create),
  controllers.AdController.create
)

routes.put(
  '/ads/:id',
  validate(validators.General.idParam),
  validate(validators.Ad.update),
  controllers.AdController.update
)

routes.delete(
  '/ads/:id',
  validate(validators.General.idParam),
  controllers.AdController.delete
)

/** Purchases **/
routes.post(
  '/purchases',
  validate(validators.Purchase.create),
  controllers.PurchaseController.create
)

module.exports = routes
