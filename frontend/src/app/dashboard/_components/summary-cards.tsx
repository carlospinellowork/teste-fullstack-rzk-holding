import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { DashboardSummary } from "@/types/api";
import {
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Wallet
} from "lucide-react";

interface SummaryCardsProps {
  totals: DashboardSummary["totals"];
}

export function SummaryCards({ totals }: SummaryCardsProps) {
  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const formatUSD = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const summaryCards = [
    {
      title: "Total a Receber",
      value: formatBRL(totals.receivableBRL),
      description: "Contas pendentes de recebimento",
      icon: ArrowUpCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Total a Pagar",
      value: formatBRL(totals.payableBRL),
      description: "Compromissos pendentes",
      icon: ArrowDownCircle,
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    {
      title: "Total Pendente",
      value: formatBRL(totals.pendingTotalBRL),
      description: "Volume bruto em aberto",
      icon: DollarSign,
      color: "text-slate-600",
      bg: "bg-slate-50"
    },
    {
      title: "Saldo Projetado",
      value: formatBRL(totals.balanceBRL),
      valueUSD: formatUSD(totals.balanceUSD),
      description: "Receber - Pagar",
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Contas Vencidas",
      value: totals.overdueCount.toString(),
      description: "Ações imediatas necessárias",
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {summaryCards.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {stat.title}
            </CardTitle>
            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg transition-transform group-hover:scale-110`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            {stat.valueUSD && (
              <div className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {stat.valueUSD}
              </div>
            )}
            <p className="text-xs text-slate-400 mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
