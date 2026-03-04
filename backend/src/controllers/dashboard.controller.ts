import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';

const dashboardService = new DashboardService();

export class DashboardController {
  async getSummary(req: Request, res: Response) {
    try {
      const summary = await dashboardService.getSummary();
      return res.json(summary);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
