import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { projectsRouter } from './routes/projects';
import { contactRouter } from './routes/contact';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env['ALLOWED_ORIGIN'] ?? 'http://localhost:5173' }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many contact requests, please try again later.' },
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactLimiter, contactRouter);

app.use(errorHandler);

const PORT = Number(process.env['PORT'] ?? 3001);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app };
