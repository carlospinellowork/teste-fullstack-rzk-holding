import { Skeleton } from "@/components/ui/skeleton";

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

      <div className="bg-white rounded-lg border border-slate-200 p-4 flex gap-4">
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-32 rounded" />
          <div className="flex gap-3">
            <Skeleton className="h-9 w-40 rounded-md" />
            <Skeleton className="h-9 w-40 rounded-md" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm bg-white">
        <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-3 flex gap-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20 rounded" />
          ))}
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="px-6 py-4 flex gap-16 border-b border-slate-100 last:border-0 even:bg-slate-50/40"
          >
            {Array.from({ length: 6 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-20 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
