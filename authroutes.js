// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../models/User'); // Import your User model
const router = express.Router();

// User Registration (Signup)
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email:', email);
        console.log('Password:', password);


        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            // Add other fields as needed
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare( password ,user.password);
        if (!isMatch) {
            console.log("Password does not match for user:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Successful login
        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
