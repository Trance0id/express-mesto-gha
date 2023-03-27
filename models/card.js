const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [30, 'Must be less than 30 characters'],
  },
  link: {
    type: String,
    required: [true, 'this field is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
});

module.exports = mongoose.model('card', cardSchema);
