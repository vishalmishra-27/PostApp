const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    profilePicture: { type: String }
});

// Compile user model
const User = mongoose.model('User', userSchema);

module.exports = User;
