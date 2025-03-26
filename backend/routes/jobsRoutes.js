import express from 'express';
import {
    jobs,
    getJobById,
    getRecommendedJobs
} from '../controllers/jobsController.js';
import isUser from '../middlewares/isUser.js';

const router = express.Router();

router.get("/recommended", isUser , getRecommendedJobs);


export default router;