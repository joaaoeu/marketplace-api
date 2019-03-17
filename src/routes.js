const express = require('express')

const routes = express.Router()

const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')

routes.post('/auth', AuthController.store)
routes.post('/users', UserController.store)

module.exports = routes
