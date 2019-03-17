const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async create (req, res) {
    const { ad, message } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"Marketplace" <no-reply@marketplace.com>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      template: 'purchase',
      context: { ad: purchaseAd, user, message }
    })

    return res.status(204).send()
  }
}

module.exports = new PurchaseController()
