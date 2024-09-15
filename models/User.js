// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  email: String,
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
