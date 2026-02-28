import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectsRouter from './projects';
import socialImpactRouter from './social-impact';
import settingsRouter from './settings';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.API_PORT || 3001;

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET    /api/projects`);
  console.log(`   POST   /api/projects`);
  console.log(`   PUT    /api/projects/:id`);
  console.log(`   DELETE /api/projects/:id`);
  console.log(`   GET    /api/social-impact`);
  console.log(`   POST   /api/social-impact`);
  console.log(`   PUT    /api/social-impact/:id`);
  console.log(`   DELETE /api/social-impact/:id`);
});

export default app;
