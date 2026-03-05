import { Receivable } from "@/types/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleAlert, CircleCheck } from "lucide-react";

interface IDataTableProps {
  data: Receivable[];
  isLoading?: boolean;
}

const tableColumns = [
  { label: "Cliente", key: "client" },
  { label: "Descrição", key: "description" },
  { label: "Categoria", key: "category" },
  { label: "Status", key: "status" },
  { label: "Data de vencimento", key: "dueDate" },
  { label: "Valor (BRL)", key: "value" },
];

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

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRow key={i} className="even:bg-muted/20">
          {tableColumns.map((col) => (
            <TableCell key={col.key} className="px-6 py-3">
              <Skeleton className="h-4 w-full rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export const DataTable = ({ data, isLoading = false }: IDataTableProps) => {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-slate-50/80 border-b border-slate-200">
          <TableRow>
            {tableColumns.map((col) => (
              <TableHead
                key={col.key}
                className="px-6 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <SkeletonRows />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={tableColumns.length}
                className="h-48 text-center text-slate-400"
              >
                Nenhum recebimento encontrado para os filtros selecionados.
              </TableCell>
            </TableRow>
          ) : (
            data.map((Receivable) => {
              const isOverdue =
                Receivable.status === "PENDING" &&
                new Date(Receivable.due_date) < new Date();

              return (
                <TableRow
                  key={Receivable.id}
                  className="hover:bg-slate-50 transition-colors even:bg-slate-50/40"
                >
                  <TableCell className="font-semibold px-6 py-3 text-slate-800">
                    {Receivable.client}
                  </TableCell>

                  <TableCell className="px-6 py-3 max-w-55">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="block truncate cursor-default text-slate-600">
                          {Receivable.description ?? "—"}
                        </span>
                      </TooltipTrigger>
                      {Receivable.description && (
                        <TooltipContent className="max-w-xs">
                          {Receivable.description}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TableCell>

                  <TableCell className="px-6 py-3">
                    {Receivable.category ? (
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {Receivable.category}
                      </Badge>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </TableCell>

                  <TableCell className="px-6 py-3">
                    <Badge
                      variant="outline"
                      className={`px-2 gap-1.5 text-xs font-medium ${
                        Receivable.status === "RECEIVED"
                          ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                          : "border-amber-200 text-amber-700 bg-amber-50"
                      }`}
                    >
                      {Receivable.status === "RECEIVED" ? (
                        <CircleCheck className="h-3.5 w-3.5 fill-emerald-500 text-white" />
                      ) : (
                        <CircleAlert className="h-3.5 w-3.5 fill-amber-500 text-white" />
                      )}
                      {ReceivableStatusMap[Receivable.status] ??
                        Receivable.status}
                    </Badge>
                  </TableCell>

                  <TableCell
                    className={`px-6 py-3 text-sm ${isOverdue ? "text-rose-600 font-medium" : "text-slate-600"}`}
                  >
                    {formatDate(Receivable.due_date)}
                    {isOverdue && (
                      <span className="ml-1.5 text-xs bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-semibold">
                        Vencida
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="px-6 py-3 font-semibold text-slate-800 tabular-nums">
                    {formatBRL(Receivable.amount)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
