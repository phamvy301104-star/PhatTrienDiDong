const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide service name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide service description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide service price']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide service duration in minutes']
  },
  image: {
    type: String,
    default: 'default-service.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);
