
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



const UserController = {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            // Generate a JWT token
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

            res.status(201).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Check if user is active
            if (!user.active) {
                return res.status(400).json({ error: 'User is not active' });
            }

            // Check if password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async getUser(req, res) {
        try {
            const user = await User.findById(req.user._id);
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async getAllUsers(req, res) {
        const userId = req.userId;

        const user = await User.findById(userId);

        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

export default UserController;
