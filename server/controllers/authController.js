const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Plaintext password (registration):', password);
        // console.log('Hashed password (registration):', hashedPassword);

        // Create a new user
        const user = new User({
            name,
            email,
            password,
            role: role || 'manager',
            uid: uuidv4(),
        });

        await user.save();
        console.log('User registered successfully:', user);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token including role in the payload
        const token = jwt.sign(
            { id: user._id, role: user.role, uid: user.uid, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token valid for 1 day
        );

        // Send the token back to the client
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Hash the password
        
        console.log('Plaintext password (registration):', password);

        // Create a new admin user
        const admin = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin', // Explicitly set role as admin
            uid: uuidv4(),
        });

        await admin.save();
        console.log('Admin registered successfully:', admin);

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Admin registration error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
