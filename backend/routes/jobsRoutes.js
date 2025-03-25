import express from 'express';
import {
    jobs,
    searchJobsBySkills,
    getJobById
} from '../controllers/jobsController.js';

const router = express.Router();

// GET all jobs
router.get('/', jobs);

// POST search jobs by skills
router.post('/jobsbyskill' , searchJobsBySkills);

// GET job by ID
router.get('/:id', getJobById);

export default router;