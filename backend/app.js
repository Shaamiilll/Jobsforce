  import express from 'express';
  import cors from 'cors';
  import morgan from 'morgan';
  import authRoutes from './routes/authRoutes.js';
  import ResumeRoutes from './routes/resumeRoutes.js';
  import jobsRoutes from './routes/jobsRoutes.js';
  import { fetchJobsFromAPI } from './utils/jobFetcher.js';
import Job from './models/job.js';

  const app = express();

  // Middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json()); 

  // fetchJobsFromAPI()

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/resume', ResumeRoutes);
  app.use('/api/jobs', jobsRoutes);

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
