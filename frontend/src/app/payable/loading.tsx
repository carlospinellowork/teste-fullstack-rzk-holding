import { Card } from "@/components/ui/card";

export default function LoadingPayables() {
  return (
    <div>
      <div>
        <h2>Contas a Pagar </h2>
      </div>
      <Card>
        <div>
          <p>Aguarde, carregando contas...</p>
        </div>
      </Card>
    </div>
  );
}
