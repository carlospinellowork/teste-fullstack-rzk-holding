import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";
import { TableSkeleton } from "./table-skeleton";

export interface Column<T> {
  header: string;
  key: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  rowKey: (item: T) => string | number;
}

export function GenericTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "Nenhum registro encontrado.",
  rowKey,
}: GenericTableProps<T>) {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-slate-50/80 border-b border-slate-200">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={`px-6 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider ${col.className || ""}`}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableSkeleton columnsCount={columns.length} />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-48 text-center text-slate-400"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={rowKey(item)}
                className="hover:bg-slate-50 transition-colors even:bg-slate-50/40"
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={`px-6 py-3 ${col.className || ""}`}
                  >
                    {col.render ? col.render(item) : (item as any)[col.key] || "—"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
