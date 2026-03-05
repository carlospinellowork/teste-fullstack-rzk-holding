import { Button } from "@/components/ui/button";
import { PaginationMeta } from "@/types/api";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationTableProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const DataTablePagination = ({
  meta,
  onPageChange,
}: PaginationTableProps) => {
  const { page, totalPages, total, limit } = meta;

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const getPageNumbers = (page: number, totalPages: number) => {
    const pages = [];

    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    if (totalPages <= 7) {
      return range(1, totalPages);
    }

    pages.push(1);

    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);

    if (start > 2) {
      pages.push("...");
    }

    pages.push(...range(start, end));

    if (end < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-sm text-slate-500 order-2 sm:order-1">
        {total === 0
          ? "Nenhum registro encontrado"
          : `Exibindo ${from}–${to} de ${total} registros`}
      </span>

      <div className="flex items-center gap-1 order-1 sm:order-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-slate-200"
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          title="Primeira página"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-slate-200"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          title="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers(page, totalPages).map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-8 text-center text-slate-400 text-sm"
            >
              …
            </span>
          ) : (
            <Button
              key={pageNumber}
              variant={pageNumber === page ? "default" : "outline"}
              size="icon"
              className={`h-8 w-8 text-sm ${pageNumber === page
                  ? "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                  : "border-slate-200 text-slate-600"
                }`}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-slate-200"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange(page + 1)}
          title="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-slate-200"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange(totalPages)}
          title="Última página"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
