const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imagePublicId: String,
  isPublished: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exchange: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);