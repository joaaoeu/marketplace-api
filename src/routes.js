const express = require('express')
const controllers = require('./app/controllers')

const routes = express.Router()

routes.post('/auth', controllers.AuthController.store)
routes.post('/users', controllers.UserController.store)

module.exports = routes
