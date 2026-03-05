"use client";

import { useGetAllReceivables } from "@/api/queries/receivable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Receivable } from "@/types/api";
import { FilterX, Plus } from "lucide-react";
import { useState } from "react";
import { DataTable } from "./_components/data-table";
import { DataTablePagination } from "./_components/data-table-pagination";
import { DateFilter } from "./_components/date-filter";
import { ReceivableForm } from "./_components/form";

export default function ReceivablesPage() {
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openDialogReceivable, setOpenDialogReceivable] = useState(false);
  const [receivableSelected, setReceivableSelected] = useState<Receivable | null>(
    null,
  );

  const { data, isLoading, isFetching } = useGetAllReceivables({
    page,
    limit: 10,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    setPage(1);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    setPage(1);
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleCloseDialog = () => {
    setOpenDialogReceivable(false);
    setReceivableSelected(null);
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Contas a Receber
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Gestão de contas a receber da sua empresa
          </p>
        </div>
        <Dialog
          open={openDialogReceivable}
          onOpenChange={(open) => {
            setOpenDialogReceivable(open);
            if (!open) setReceivableSelected(null);
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              onClick={() => setReceivableSelected(null)}
            >
              <Plus className="h-4 w-4" />
              Novo Recebimento
            </Button>
          </DialogTrigger>

          <ReceivableForm
            receivableSelectedData={receivableSelected}
            onClose={handleCloseDialog}
          />
        </Dialog>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Filtrar por Vencimento
            </span>
            <DateFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              onClear={handleClearFilters}
            />
          </div>

          {(startDate || endDate) && (
            <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg">
              <FilterX className="h-3.5 w-3.5" />
              <span>
                {startDate && endDate
                  ? `${new Date(startDate + "T00:00:00").toLocaleDateString("pt-BR")} até ${new Date(endDate + "T00:00:00").toLocaleDateString("pt-BR")}`
                  : startDate
                    ? `A partir de ${new Date(startDate + "T00:00:00").toLocaleDateString("pt-BR")}`
                    : `Até ${new Date(endDate + "T00:00:00").toLocaleDateString("pt-BR")}`}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div
          className={`transition-opacity duration-200 ${isFetching && !isLoading ? "opacity-60" : "opacity-100"}`}
        >
          <DataTable
            data={data?.data ?? []}
            isLoading={isLoading}
            setReceivableSelected={setReceivableSelected}
            openDialog={() => setOpenDialogReceivable(true)}
          />
        </div>

        {data?.meta && (
          <DataTablePagination meta={data.meta} onPageChange={handleChangePage} />
        )}
      </div>
    </div>
  );
}

