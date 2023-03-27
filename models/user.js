const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [30, 'Must be less than 30 characters'],
    required: true,
  },
  about: {
    type: String,
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [30, 'Must be less than 30 characters'],
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
