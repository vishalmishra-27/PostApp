const Post = require('../models/Post');

const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get page from query parameters, default to 1 if not provided
    const perPage = 5; // Number of posts per page

    try {
        const posts = await Post.find()
            .sort({ title: 1 }) // Sort by title in ascending order
            .skip((page - 1) * perPage) // Skip posts based on page number
            .limit(perPage); // Limit the number of posts returned per page

        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getPosts };
