import { Payable, Prisma } from '@prisma/client';
import { prisma } from '../database';

export class PayableService {
  async create(data: Prisma.PayableCreateInput): Promise<Payable> {
    return prisma.payable.create({ data });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    startDate?: string,
    endDate?: string,
  ) {
    const skip = (page - 1) * limit;
    const where: Prisma.PayableWhereInput = {};

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
      prisma.payable.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          due_date: 'asc',
        },
      }),
      prisma.payable.count({ where }),
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
    return prisma.payable.findUnique({ where: { id } });
  }

  async updateById(id: string, data: Prisma.PayableUpdateInput) {
    return prisma.payable.update({ where: { id }, data });
  }

  async deleteById(id: string) {
    return prisma.payable.delete({ where: { id } });
  }
}
