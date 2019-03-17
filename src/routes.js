const express = require('express')
const middlewares = require('./app/middlewares')
const controllers = require('./app/controllers')

const routes = express.Router()

/** Public routes **/
/** Auth **/
routes.post('/auth', controllers.AuthController.authenticate)

/** Users **/
routes.post('/users', controllers.UserController.create)

/** Private routes **/
routes.use(middlewares.auth)

/** Ads **/
routes.get('/ads', controllers.AdController.list)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.create)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.delete)

/** Purchases **/
routes.post('/purchases', controllers.PurchaseController.create)

module.exports = routes
