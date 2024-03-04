const User = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Route for handling password reset requests
router.post('/resetpassword', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verify if the old password matches the one stored in the database
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordCorrect) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        // Return success message
        res.status(200).json({ message: 'Password Updated' });
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
