// backend/routes/authRoutes.js
import express from 'express';
import { jobs } from '../controllers/jobsController';
const router = express.Router();

router.get('/jobs' ,jobs )

export default router;
