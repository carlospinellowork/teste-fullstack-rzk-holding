import { Request, Response } from 'express';
import {
  CreatePayableSchema,
  UpdatePayableSchema,
} from '../schemas/payable.schema';
import { PayableService } from '../services/payable.service';

const payableService = new PayableService();

export class PayableController {
  async create(req: Request, res: Response) {
    const data = CreatePayableSchema.parse(req.body);

    const payable = await payableService.create(data);

    return res.status(201).json(payable);
  }

  async getAll(req: Request, res: Response) {
    const payables = await payableService.findAll();

    return res.status(201).json(payables);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const payable = await payableService.findById(id as string);

    if (!payable) {
      return res.status(404).json({ error: 'Payable not found' });
    }

    return res.json(payable);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = UpdatePayableSchema.parse(req.body);

    const payable = await payableService.updateById(id as string, data);

    if (!payable) {
      return res.status(404).json({ error: 'Payable not found' });
    }

    return res.json(payable);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const payable = await payableService.deleteById(id as string);

    if (!payable) {
      return res.status(404).json({ error: 'Payable not found' });
    }

    return res.status(204).send();
  }
}
