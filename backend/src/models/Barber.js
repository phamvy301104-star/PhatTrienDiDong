const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide barber name'],
    trim: true
  },
  specialization: {
    type: String,
    required: [true, 'Please provide specialization']
  },
  experience: {
    type: Number,
    required: [true, 'Please provide years of experience']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    default: 'default-barber.jpg'
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Barber', barberSchema);
