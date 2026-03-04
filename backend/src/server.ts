import cors from 'cors';
import express from 'express';
import { config } from './config/env';
import { errorHandler } from './middleware/error.handler';
import { dashboardRoutes } from './routes/dashboard.routes';
import { payableRoutes } from './routes/payable.routes';
import { receivableRoutes } from './routes/receivable.routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Server is running!');
});

app.use('/payables', payableRoutes);
app.use('/receivables', receivableRoutes);
app.use('/dashboard', dashboardRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
