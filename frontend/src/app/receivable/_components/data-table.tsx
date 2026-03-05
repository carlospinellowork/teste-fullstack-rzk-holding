import { useDeleteReceivable, usePutReceivable } from "@/api/mutations/receivable";
import { DeleteConfirmationDialog } from "@/components/globals/delete-confirmation-dialog";
import { Column, GenericTable } from "@/components/globals/generic-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Receivable } from "@/types/api";
import { CircleAlert, CircleCheck, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

interface IDataTableProps {
  data: Receivable[];
  isLoading?: boolean;
  setReceivableSelected: (receivable: Receivable | null) => void;
  openDialog: () => void;
}

const ReceivableStatusMap: Record<string, string> = {
  PENDING: "PENDENTE",
  RECEIVED: "RECEBIDO",
};

const formatBRL = (val: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    val,
  );

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("pt-BR", { timeZone: "UTC" });

export const DataTable = ({
  data,
  isLoading = false,
  setReceivableSelected,
  openDialog,
}: IDataTableProps) => {
  const { mutate: deleteReceivable } = useDeleteReceivable();
  const { mutate: updateReceivable } = usePutReceivable();
  const [receivableToDelete, setReceivableToDelete] = useState<string | null>(null);

  const handleMarkAsReceived = (receivable: Receivable) => {
    updateReceivable({ id: receivable.id, status: "RECEIVED" });
  };

  const columns: Column<Receivable>[] = [
    { header: "Cliente", key: "client", className: "font-semibold text-slate-800" },
    {
      header: "Descrição",
      key: "description",
      render: (item) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="block truncate cursor-default text-slate-600 max-w-55">
              {item.description ?? "—"}
            </span>
          </TooltipTrigger>
          {item.description && <TooltipContent className="max-w-xs">{item.description}</TooltipContent>}
        </Tooltip>
      )
    },
    {
      header: "Categoria",
      key: "category",
      render: (item) => item.category ? <Badge variant="secondary">{item.category}</Badge> : <span className="text-slate-400 text-sm">—</span>
    },
    {
      header: "Status",
      key: "status",
      render: (item) => (
        <Badge
          variant="outline"
          className={`px-2 gap-1.5 text-xs font-medium ${item.status === "RECEIVED" ? "border-emerald-200 text-emerald-700 bg-emerald-50" : "border-amber-200 text-amber-700 bg-amber-50"
            }`}
        >
          {item.status === "RECEIVED" ? <CircleCheck className="h-3.5 w-3.5 fill-emerald-500 text-white" /> : <CircleAlert className="h-3.5 w-3.5 fill-amber-500 text-white" />}
          {ReceivableStatusMap[item.status]}
        </Badge>
      )
    },
    {
      header: "Vencimento",
      key: "due_date",
      render: (item) => {
        const isOverdue = item.status === "PENDING" && new Date(item.due_date) < new Date();
        return (
          <span className={isOverdue ? "text-rose-600 font-medium" : "text-slate-600"}>
            {formatDate(item.due_date)}
            {isOverdue && <span className="ml-1.5 text-xs bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-semibold">Vencida</span>}
          </span>
        );
      }
    },
    {
      header: "Valor",
      key: "amount",
      className: "font-semibold text-slate-800 tabular-nums",
      render: (item) => formatBRL(item.amount)
    },
    {
      header: "Ações",
      key: "actions",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setReceivableSelected(item);
                openDialog();
              }}
            >
              <Eye className="mr-2 h-4 w-4" /> Visualizar/Editar
            </DropdownMenuItem>
            {item.status === "PENDING" && (
              <DropdownMenuItem
                onClick={() => handleMarkAsReceived(item)}
                className="text-emerald-600"
              >
                <CircleCheck className="mr-2 h-4 w-4" /> Marcar como recebido
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setReceivableToDelete(item.id)}
              className="text-rose-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <>
      <GenericTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        rowKey={(item) => item.id}
        emptyMessage="Nenhum recebimento encontrado para os filtros selecionados."
      />

      <DeleteConfirmationDialog
        open={!!receivableToDelete}
        onOpenChange={(open) => !open && setReceivableToDelete(null)}
        onConfirm={() => {
          if (receivableToDelete) {
            deleteReceivable(receivableToDelete);
            setReceivableToDelete(null);
          }
        }}
        title="Deseja excluir este recebimento?"
      />
    </>
  );
};
