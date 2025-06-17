import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import dotenv from 'dotenv';
import path from 'path';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/logger';
import { searchRouter } from './routes/search.routes';
logger.info('Environment variables loaded:');
logger.info(`PORT: ${process.env.PORT}`);
logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
logger.info(`OPENROUTER_API_KEY: ${process.env.OPENROUTER_API_KEY ? 'Set' : 'Not set'}`);
logger.info(`OPENROUTER_API_URL: ${process.env.OPENROUTER_API_URL}`);
logger.info(`LOG_LEVEL: ${process.env.LOG_LEVEL}`);

const app = express();
// Load environment variables from the project root .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
// Routes
app.use('/api', searchRouter);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
