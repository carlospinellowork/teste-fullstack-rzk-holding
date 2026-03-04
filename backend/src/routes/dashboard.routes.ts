import express from 'express';
import { DashboardController } from '../controllers/dashboard.controller';

const router = express.Router();
const dashboardController = new DashboardController();

router.get('/summary', dashboardController.getSummary);

export { router as dashboardRoutes };
