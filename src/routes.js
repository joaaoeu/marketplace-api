const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')

routes.post('/auth', AuthController.store)
routes.post('/users', UserController.store)

module.exports = routes
