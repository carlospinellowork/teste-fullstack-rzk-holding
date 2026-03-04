import { Prisma, Receivable } from '@prisma/client';
import { prisma } from '../database';

export class ReceivableService {
  async create(data: Prisma.ReceivableCreateInput): Promise<Receivable> {
    return prisma.receivable.create({ data });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    startDate?: string,
    endDate?: string,
  ) {
    const skip = (page - 1) * limit;
    const where: Prisma.ReceivableWhereInput = {};

    if (startDate || endDate) {
      where.due_date = {};
      if (startDate) {
        where.due_date.gte = new Date(startDate);
      }
      if (endDate) {
        where.due_date.lte = new Date(endDate);
      }
    }

    const [data, total] = await Promise.all([
      prisma.receivable.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          due_date: 'asc',
        },
      }),
      prisma.receivable.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
