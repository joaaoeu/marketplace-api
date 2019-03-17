const express = require('express')
const middlewares = require('./app/middlewares')
const controllers = require('./app/controllers')

const routes = express.Router()

/** Public routes **/
/** Auth **/
routes.post('/auth', controllers.AuthController.store)

/** Users **/
routes.post('/users', controllers.UserController.store)

/** Private routes **/
routes.use(middlewares.auth)

/** Ads **/
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

module.exports = routes
