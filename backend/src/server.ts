import cors from 'cors';
import express from 'express';
import { config } from './config/env';
import { errorHandler } from './middleware/error.handler';
import { payableRoutes } from './routes/payable.routes';
import { receivableRoutes } from './routes/receivable.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Server is running!');
});

app.use('/payables', payableRoutes);
app.use('/receivables', receivableRoutes);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
