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

    if (purchaseAd.author.id.equals(req.userId)) {
      return res
        .status(400)
        .json({ error: "You can't sell your Ad to yourself." })
    }

    if (purchaseAd.purchasedBy) {
      return res.status(400).json({ error: 'This Ad is already purchased.' })
    }

    const purchase = await Purchase.create({ ...req.body, author: req.userId })
    await Purchase.populate(purchase, [
      { path: 'ad', populate: { path: 'author' } },
      'author'
    ])

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      message
    }).save()

    return res.status(200).send(purchase)
  }

  async sale (req, res) {
    const purchase = await Purchase.findById(req.params.id).populate([
      { path: 'ad', populate: { path: 'author' } },
      'author'
    ])

    if (!purchase.ad.author.id.equals(req.userId)) {
      return res
        .status(400)
        .json({ error: "You can't sell someone else's ad." })
    }

    if (purchase.ad.purchasedBy) {
      return res
        .status(400)
        .json({ error: "You can't sell a Ad that has already been sold." })
    }

    const ad = await Ad.findByIdAndUpdate(
      purchase.ad.id,
      { purchasedBy: purchase.id },
      { new: true }
    ).populate([
      'author',
      { path: 'purchasedBy', populate: { path: 'author' } }
    ])

    return res.status(200).json(ad)
  }
}

module.exports = new PurchaseController()
