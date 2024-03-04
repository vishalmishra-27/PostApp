const express = require('express');
const { signupUser, signupValidationRules } = require('../controllers/signupController');
const router = express.Router();

// Route for singup user
router.post('/signup', signupValidationRules(), signupUser);

module.exports = router;
