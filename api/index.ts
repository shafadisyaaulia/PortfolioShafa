import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Express } from 'express';
import cors from 'cors';
import projectsRouter from './projects';
import socialImpactRouter from './social-impact';
import settingsRouter from './settings';

// Create Express app
const app: Express = express();

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
export default async (req: VercelRequest, res: VercelResponse) => {
  // Vercel passes the request through Express
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
