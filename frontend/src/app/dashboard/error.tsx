"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function ErrorDashboard({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 min-h-[400px]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <AlertCircle className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">Ops! Algo deu errado</h2>
          <p className="text-slate-500">
            Não conseguimos carregar as informações do dashboard no momento. Isso pode ser um problema temporário na conexão com o servidor.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="p-3 bg-slate-50 rounded text-xs text-rose-500 text-left font-mono overflow-auto max-h-32">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Tentar Novamente
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full gap-2 border-slate-200 text-slate-600 hover:bg-slate-50">
              <Home className="h-4 w-4" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
