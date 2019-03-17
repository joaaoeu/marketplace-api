const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')
const databaseConfig = require('./config/database')
const middlewares = require('./app/middlewares')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(routes)
  }

  exception () {
    this.express.use(middlewares.handleException(this.isDev))
  }
}

module.exports = new App().express
