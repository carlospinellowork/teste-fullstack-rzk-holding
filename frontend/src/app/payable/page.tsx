"use client";

import { Card } from "@/components/ui/card";

export default function PayablesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Contas a Pagar</h2>
      </div>
      <Card className="border-none shadow-sm h-[500px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-slate-500 italic">Árvore de componentes da Tabela de Pagáveis em construção...</p>
          <p className="text-xs text-slate-400">Aqui implementaremos a paginação e os filtros de data.</p>
        </div>
      </Card>
    </div>
  );
}
