require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Sentry = require('@sentry/node')

const routes = require('./routes')
const databaseConfig = require('./config/database')
const sentryConfig = require('./config/sentry')
const middlewares = require('./app/middlewares')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(Sentry.Handlers.requestHandler())
  }

  routes () {
    this.express.use(routes)
  }

  exception () {
    if (!this.isDev) {
      this.express.use(Sentry.Handlers.errorHandler())
    }
    this.express.use(middlewares.handleException(this.isDev))
  }
}

module.exports = new App().express
