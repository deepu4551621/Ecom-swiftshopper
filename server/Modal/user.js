const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  gender: String,
  image: String,
  token:String
  // Add other fields as needed
});

// Define and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
