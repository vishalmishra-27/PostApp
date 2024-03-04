const mongoose = require('mongoose');

// Define post schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }
});

// Compile post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
