"use client";

import { useGetDashboardSummary } from "@/api/queries/dashboard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";
import { DashboardView } from "./_components/dashboard-view";
import LoadingDashboard from "./loading";

export default function DashboardPage() {
  const { data, isLoading } = useGetDashboardSummary();

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const chartData = useMemo(() => {
    if (!data) return { lineChartData: [], monthlyData: [] };

    const { charts } = data;

    const allTransactions = [
      ...charts.rawEvolution.payables.map(raw => ({ ...raw, multiplier: -1 })),
      ...charts.rawEvolution.receivables.map(raw => ({ ...raw, multiplier: 1 }))
    ];

    const evolutionData = allTransactions.reduce((acc, item) => {
      const dateKey = format(new Date(item.due_date), 'yyyy-MM-dd');

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: format(new Date(item.due_date), 'MM-dd'),
          balance: 0,
          timestamp: new Date(item.due_date).getTime()
        };
      }

      acc[dateKey].balance += item.amount * item.multiplier;
      return acc;
    }, {} as Record<string, { date: string, balance: number, timestamp: number }>);

    const lineChartData = Object.values(evolutionData)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(item => ({ date: item.date, Saldo: item.balance }));

    const monthlyMap: Record<string, { name: string, pagar: number, receber: number }> = {};

    charts.rawEvolution.payables.forEach(p => {
      const month = format(new Date(p.due_date), 'MMM', { locale: ptBR });
      if (!monthlyMap[month]) monthlyMap[month] = { name: month, pagar: 0, receber: 0 };
      monthlyMap[month].pagar += p.amount;
    });

    charts.rawEvolution.receivables.forEach(r => {
      const month = format(new Date(r.due_date), 'MMM', { locale: ptBR });
      if (!monthlyMap[month]) monthlyMap[month] = { name: month, pagar: 0, receber: 0 };
      monthlyMap[month].receber += r.amount;
    });

    const monthlyData = Object.values(monthlyMap);

    return { lineChartData, monthlyData };
  }, [data]);

  if (isLoading) {
    return <LoadingDashboard />;
  }

  if (!data) return null;

  return (
    <DashboardView
      data={data}
      chartData={chartData}
      formatBRL={formatBRL}
    />
  );
}
