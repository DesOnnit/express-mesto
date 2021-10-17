const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 30,
    minLength: 2,
    required: true,
  },
  about: {
    type: String,
    maxLength: 30,
    minLength: 2,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
