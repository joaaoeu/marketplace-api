const Ad = require('../models/Ad')

class AdController {
  async list (req, res) {
    const filters = {}

    if (req.query.minPrice || req.query.maxPrice) filters.price = {}
    if (req.query.minPrice) filters.price.$gte = req.query.minPrice
    if (req.query.maxPrice) filters.price.$lte = req.query.maxPrice
    if (req.query.title) filters.title = new RegExp(req.query.title, 'i')

    const result = await Ad.paginate(filters, {
      populate: ['author'],
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.pageSize) || 10,
      sort: '-createdAt'
    })

    delete Object.assign(result, { ads: result.docs }).docs

    return res.status(200).json(result)
  }

  async show (req, res) {
    const ad = await Ad.findById(req.params.id).populate('author')
    return res.status(200).json(ad)
  }

  async create (req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })
    await Ad.populate(ad, 'author')
    return res.status(201).json(ad)
  }

  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate('author')
    return res.status(200).json(ad)
  }

  async delete (req, res) {
    await Ad.findByIdAndDelete(req.params.id)
    return res.status(204).send()
  }
}

module.exports = new AdController()
