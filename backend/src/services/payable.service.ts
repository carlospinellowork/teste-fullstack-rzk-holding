import { Payable, Prisma } from '@prisma/client';
import { prisma } from '../database';

export class PayableService {
  async create(data: Prisma.PayableCreateInput): Promise<Payable> {
    return prisma.payable.create({ data });
  }

  async findAll() {
    return prisma.payable.findMany({
      orderBy: {
        due_date: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.payable.findUnique({ where: { id } });
  }

  async updateById(id: string, data: Prisma.PayableUpdateInput) {
    return prisma.payable.update({ where: { id }, data });
  }

  async deleteById(id: string) {
    return prisma.payable.delete({ where: { id } });
  }
}
