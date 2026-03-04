import { Card } from "@/components/ui/card";

export default function LoadingReceivables() {
  return (
    <div>
      <div>
        <h2>Contas a Receber</h2>
      </div>
      <Card>
        <div>
          <p>Aguarde, carregando receivable...</p>
        </div>
      </Card>
    </div>
  );
}
