const express = require('express');
const router = express.Router();

const { getPosts } = require('../controllers/postController');

// Route for fetching posts
router.get('/posts', getPosts);

module.exports = router;