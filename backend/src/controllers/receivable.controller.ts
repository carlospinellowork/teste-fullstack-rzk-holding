import { Request, Response } from 'express';
import {
  CreateReceivableSchema,
  UpdateReceivableSchema,
} from '../schemas/receivable.schema';
import { ReceivableService } from '../services/receivable.service';

const receivableService = new ReceivableService();

export class ReceivableController {
  async create(req: Request, res: Response) {
    const data = CreateReceivableSchema.parse(req.body);

    const receivable = await receivableService.create(data);

    return res.status(201).json(receivable);
  }

  async getAll(req: Request, res: Response) {
    const receivables = await receivableService.findAll();

    return res.status(201).json(receivables);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const receivable = await receivableService.findById(id as string);

    if (!receivable) {
      return res.status(404).json({ error: 'Receivable not found' });
    }

    return res.json(receivable);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = UpdateReceivableSchema.parse(req.body);

    const receivable = await receivableService.updateById(id as string, data);

    if (!receivable) {
      return res.status(404).json({ error: 'Receivable not found' });
    }

    return res.json(receivable);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const receivable = await receivableService.deleteById(id as string);

    if (!receivable) {
      return res.status(404).json({ error: 'Receivable not found' });
    }

    return res.status(204).send();
  }
}
