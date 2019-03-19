const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const validators = require('./app/validators')
const middlewares = require('./app/middlewares')
const controllers = require('./app/controllers')

const routes = express.Router()

/** Public routes **/
/** Auth **/
routes.post(
  '/auth',
  validate(validators.Auth.authenticate),
  handle(controllers.AuthController.authenticate)
)

/** Users **/
routes.post(
  '/users',
  validate(validators.User.create),
  handle(controllers.UserController.create)
)

/** Private routes **/
routes.use(middlewares.auth)

/** Ads **/
routes.get(
  '/ads',
  validate(validators.Ad.list),
  handle(controllers.AdController.list)
)

routes.get(
  '/ads/:id',
  validate(validators.General.idParam),
  handle(controllers.AdController.show)
)

routes.post(
  '/ads',
  validate(validators.Ad.create),
  handle(controllers.AdController.create)
)

routes.put(
  '/ads/:id',
  validate(validators.General.idParam),
  validate(validators.Ad.update),
  handle(controllers.AdController.update)
)

routes.delete(
  '/ads/:id',
  validate(validators.General.idParam),
  handle(controllers.AdController.delete)
)

/** Purchases **/
routes.post(
  '/purchases',
  validate(validators.Purchase.create),
  handle(controllers.PurchaseController.create)
)

routes.post(
  '/purchases/approve/:id',
  validate(validators.General.idParam),
  handle(controllers.PurchaseController.approve)
)

module.exports = routes
