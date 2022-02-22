import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import path from 'path';

import activityRoutes from './routes/activityRoutes.js';
import activitySuggestionRoutes from './routes/activitySuggestionRoutes.js';
import motivationRoutes from './routes/motivationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import multerRoutes from './routes/multerRoutes.js';

dotenv.config();

connectDB();

const app = express();

// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/activities', activityRoutes);
app.use('/api/activitySuggestions', activitySuggestionRoutes);
app.use('/api/motivations', motivationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', multerRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is currently running...');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
