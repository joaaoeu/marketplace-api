const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async create (req, res) {
    const { ad, message } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')

    if (!purchaseAd) {
      return res.status(400).json({ error: "This Ad doesn't exist!" })
    }

    if (purchaseAd.author._id.equals(req.userId)) {
      return res
        .status(400)
        .json({ error: "You can't sell your Ad to yourself." })
    }

    if (purchaseAd.purchasedBy) {
      return res.status(400).json({ error: 'This Ad is already purchased.' })
    }

    const hasPurchase = await Purchase.findOne({ ad, author: req.userId })

    if (hasPurchase) {
      return res.status(400).json({
        error:
          "You can't do a Purchase Solicitation of an Ad that you already solicit!"
      })
    }

    const user = await User.findById(req.userId)
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

  async approve (req, res) {
    const purchase = await Purchase.findById(req.params.id).populate([
      { path: 'ad', populate: { path: 'author' } },
      'author'
    ])

    if (!purchase) {
      return res.status(400).json({ error: "This Purchase doesn't exist!" })
    }

    if (!purchase.ad.author._id.equals(req.userId)) {
      return res
        .status(400)
        .json({ error: "You can't approve a Purchase of someone else's ad." })
    }

    if (purchase.ad.purchasedBy) {
      return res.status(400).json({
        error:
          "You can't approve a Purchase of an Ad that has already been sold."
      })
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
