import { prisma } from '../database';
import { ExchangeRate } from '../external/exchangeRate';

export class DashboardService {
  async getSummary() {
    const usdRate = await ExchangeRate.getUSD();

    const payables = await prisma.payable.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'PENDING',
      },
    });

    const receivables = await prisma.receivable.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'PENDING',
      },
    });

    const totalPayableBRL = payables._sum.amount || 0;
    const totalReceivableBRL = receivables._sum.amount || 0;

    const payableByCategory = await prisma.payable.groupBy({
      by: ['category'],
      _sum: {
        amount: true,
      },
    });

    const allPayables = await prisma.payable.findMany({
      select: {
        amount: true,
        due_date: true,
      },
    });

    const allReceivables = await prisma.receivable.findMany({
      select: {
        amount: true,
        due_date: true,
      },
    });

    const today = new Date();
    const expiredPayables = await prisma.payable.count({
      where: { status: 'PENDING', due_date: { lt: today } },
    });
    const expiredReceivables = await prisma.receivable.count({
      where: { status: 'PENDING', due_date: { lt: today } },
    });

    return {
      totals: {
        payableBRL: totalPayableBRL,
        receivableBRL: totalReceivableBRL,
        pendingTotalBRL: totalPayableBRL + totalReceivableBRL,
        balanceBRL: totalReceivableBRL - totalPayableBRL,
        payableUSD: totalPayableBRL * usdRate,
        receivableUSD: totalReceivableBRL * usdRate,
        pendingTotalUSD: (totalPayableBRL + totalReceivableBRL) * usdRate,
        balanceUSD: (totalReceivableBRL - totalPayableBRL) * usdRate,
        overdueCount: expiredPayables + expiredReceivables,
        conversionRate: usdRate,
      },
      charts: {
        byCategory: payableByCategory.map((item) => ({
          category: item.category || 'Outros',
          amount: item._sum.amount,
        })),
        rawEvolution: {
          payables: allPayables,
          receivables: allReceivables,
        },
      },
    };
  }
}
