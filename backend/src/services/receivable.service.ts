import { Prisma, Receivable } from '@prisma/client';
import { prisma } from '../database';

export class ReceivableService {
  async create(data: Prisma.ReceivableCreateInput): Promise<Receivable> {
    return prisma.receivable.create({ data });
  }

  async findAll() {
    return prisma.receivable.findMany({
      orderBy: {
        due_date: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.receivable.findUnique({ where: { id } });
  }

  async updateById(id: string, data: Prisma.ReceivableUpdateInput) {
    return prisma.receivable.update({ where: { id }, data });
  }

  async deleteById(id: string) {
    return prisma.receivable.delete({ where: { id } });
  }
}
