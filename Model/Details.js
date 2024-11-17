const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });

const Details = mongoose.model('Details', detailsSchema)

module.exports = Details