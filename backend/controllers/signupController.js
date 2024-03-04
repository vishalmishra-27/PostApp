const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

let JWT_SECRET = 'thisisvishal';

const signupUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, name, profilePicture } = req.body;

    // Check if required fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name,
            profilePicture
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Return success message and token
        res.status(201).json({ successMessage: 'User signed up successfully', token });
    } catch (error) {
        console.error('Error signing up user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const signupValidationRules = () => {
    return [
        check('username').notEmpty().withMessage('Username is required'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
        // Add optional validation rules for new fields
        check('name').optional(),
        check('profilePicture').optional()
    ];
};

module.exports = { signupUser, signupValidationRules };
