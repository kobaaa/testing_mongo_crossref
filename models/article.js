const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  doi: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  issn: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Article', articleSchema)