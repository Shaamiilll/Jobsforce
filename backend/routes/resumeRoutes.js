import express from 'express';
import { uploadResume } from '../controllers/resumeController.js';
import upload from '../middlewares/upload.js';
import isUser from '../middlewares/isUser.js';
const router = express.Router();

router.post('/upload', upload.single('resume'), isUser , uploadResume);

export default router;