export type PayableStatus = "PENDING" | "PAID";
export type ReceivableStatus = "PENDING" | "RECEIVED";

export interface Payable {
  id: string;
  provider: string;
  description?: string;
  amount: number;
  due_date: string;
  category?: string;
  status: PayableStatus;
  created_at: string;
  updated_at: string;
}

export interface Receivable {
  id: string;
  client: string;
  description?: string;
  amount: number;
  due_date: string;
  category?: string;
  status: ReceivableStatus;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface DashboardSummary {
  totals: {
    payableBRL: number;
    receivableBRL: number;
    pendingTotalBRL: number;
    balanceBRL: number;
    payableUSD: number;
    receivableUSD: number;
    pendingTotalUSD: number;
    balanceUSD: number;
    overdueCount: number;
    conversionRate: number;
  };
  charts: {
    byCategory: Array<{
      category: string;
      amount: number;
    }>;
    rawEvolution: {
      payables: Array<{
        amount: number;
        due_date: string;
      }>;
      receivables: Array<{
        amount: number;
        due_date: string;
      }>;
    };
  };
}
