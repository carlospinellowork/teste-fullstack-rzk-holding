import { DashboardSummary } from "@/types/api";
import { TrendingUp } from "lucide-react";
import { ChartsSection } from "./charts-section";
import { SummaryCards } from "./summary-cards";

interface DashboardViewProps {
  data: DashboardSummary;
  chartData: {
    monthlyData: any[];
    lineChartData: any[];
  };
  formatBRL: (val: number) => string;
}

export function DashboardView({ data, chartData, formatBRL }: DashboardViewProps) {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6 overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Dashboard BI</h2>
          <p className="text-slate-500">Gestão financeira consolidada da RZK Holding.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium text-slate-600">
            Cotação: <span className="font-bold text-slate-800">1 USD = {formatBRL(1 / data.totals.conversionRate)}</span>
          </span>
        </div>
      </div>

      <SummaryCards totals={data.totals} />

      <ChartsSection
        monthlyData={chartData.monthlyData}
        byCategory={data.charts.byCategory}
        lineChartData={chartData.lineChartData}
      />
    </div>
  );
}
