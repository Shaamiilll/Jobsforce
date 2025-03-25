import express from 'express';
import {
    jobs,
    searchJobsBySkills,
    getJobById
} from '../controllers/jobsController.js';
import isUser from '../middlewares/isUser.js';

const router = express.Router();

// GET all jobs
router.get('/', jobs);

// POST search jobs by skills
router.post('/jobsbyskill', isUser, searchJobsBySkills);

// GET job by ID
router.get('/:id', getJobById);

export default router;