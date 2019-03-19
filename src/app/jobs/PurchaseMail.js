const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, message } = job.data

    await Mail.sendMail({
      from: '"Marketplace" <no-reply@marketplace.com>',
      to: ad.author.email,
      subject: `Purchase Solicitation: ${ad.title}`,
      template: 'purchase',
      context: { ad, user, message }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
