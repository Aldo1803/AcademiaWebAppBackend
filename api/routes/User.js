import express from 'express';
import authMiddleware from '../services/Auth.js';

const router = express.Router();

// Import the User Controller
import UserController from '../controllers/User.js';

// Define the routes for user-related operations
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/users', authMiddleware , UserController.getAllUsers);

export default router;
