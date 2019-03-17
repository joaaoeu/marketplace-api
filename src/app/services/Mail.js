const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const mailConfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailConfig)

transport.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: '.'
    },
    viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
    extName: '.hbs'
  })
)

module.exports = transport
