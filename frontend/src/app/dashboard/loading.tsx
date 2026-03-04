import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDashboard() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6 overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48 bg-slate-200" />
          <Skeleton className="h-4 w-64 bg-slate-200" />
        </div>
        <Skeleton className="h-10 w-44 rounded-full bg-slate-200" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl bg-slate-200" />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4 h-[400px] rounded-xl bg-slate-200" />
        <Skeleton className="col-span-3 h-[400px] rounded-xl bg-slate-200" />
      </div>

      <Skeleton className="h-[450px] w-full rounded-xl bg-slate-200" />
    </div>
  );
}
