import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableSkeletonProps {
  columnsCount: number;
  rowsCount?: number;
}

export function TableSkeleton({ columnsCount, rowsCount = 10 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowsCount }).map((_, i) => (
        <TableRow key={i} className="even:bg-muted/20">
          {Array.from({ length: columnsCount }).map((_, j) => (
            <TableCell key={j} className="px-6 py-3">
              <Skeleton className="h-4 w-full rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
