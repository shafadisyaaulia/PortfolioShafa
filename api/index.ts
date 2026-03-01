import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import projectsRouter from './projects.js';
import socialImpactRouter from './social-impact.js';
import settingsRouter from './settings.js';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

// Export handler for Vercel serverless
export default serverless(app);
