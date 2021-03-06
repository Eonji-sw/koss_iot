const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('User', userSchema);
