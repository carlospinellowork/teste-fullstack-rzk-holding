import { Card } from "@/components/ui/card";

export default function LoadingDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-800">
          Dashboard
        </h2>
      </div>
      <Card className="border-none shadow-sm h-[500px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-slate-500 italic">
            Aguarde, carregando dashboard...
          </p>
        </div>
      </Card>
    </div>
  );
}
