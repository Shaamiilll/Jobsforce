import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

const app = express();

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
connectDB();

// API Routes
app.use('/api/auth', authRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: '🔍 Route not found' });
});

// Global Error Handling
app.use((err, req, res, next) => {
  console.error('❗ Server Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
