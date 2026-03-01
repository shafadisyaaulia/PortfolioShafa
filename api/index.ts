import express from 'express';
import cors from 'cors';
import projectsRouter from './projects';
import socialImpactRouter from './social-impact';
import settingsRouter from './settings';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Server is running' });
});

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/social-impact', socialImpactRouter);
app.use('/api/settings', settingsRouter);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ success: false, error: err.message });
});

// Export for Vercel serverless
export default app;
