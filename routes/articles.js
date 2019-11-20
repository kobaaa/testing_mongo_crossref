const express = require('express')
const router = express.Router()
const Article = require('../models/article')

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0
    const offset = parseInt(req.query.offset) || 0

    const articles = await Article.find()
      .skip(offset)
      .limit(limit)
      .sort({
        doi: 'asc'
      })
    res.json(articles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router