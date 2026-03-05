import { TableSkeleton } from "@/components/globals/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function LoadingPayables() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-slate-50/50">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-52 rounded-md" />
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <Skeleton className="h-16 w-full rounded-md" />
      </div>

      <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              {Array.from({ length: 7 }).map((_, i) => (
                <TableHead key={i}><Skeleton className="h-4 w-20" /></TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableSkeleton columnsCount={7} />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
