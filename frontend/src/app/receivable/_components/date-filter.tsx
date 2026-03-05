"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onClear: () => void;
}

export function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
}: DateFilterProps) {
  const hasFilters = startDate || endDate;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium text-slate-500">
          Data inicial
        </Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="h-9 w-40 text-sm border-slate-200 bg-white focus-visible:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium text-slate-500">Data final</Label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="h-9 w-40 text-sm border-slate-200 bg-white focus-visible:ring-blue-500"
        />
      </div>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-9 gap-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          <X className="h-3.5 w-3.5" />
          Limpar filtro
        </Button>
      )}
    </div>
  );
}
