const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [30, 'Must be less than 30 characters'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [30, 'Must be less than 30 characters'],
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
