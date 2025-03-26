// backend/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Routes of login
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
