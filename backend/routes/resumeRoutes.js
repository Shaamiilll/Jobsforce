import express from 'express';
import { uploadResume } from '../controllers/resumeController.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router.post('/upload', upload.single('resume'), uploadResume);

export default router;