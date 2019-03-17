const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async create (req, res) {
    const { ad, message } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    if (purchaseAd.purchasedBy) {
      return res.status(400).json({ error: 'Ad is already purchased.' })
    }

    await Purchase.create({ ...req.body, author: req.userId })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      message
    }).save()

    return res.status(204).send()
  }
}

module.exports = new PurchaseController()
