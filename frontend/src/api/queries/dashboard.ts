import { DashboardSummary } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance";

export const useGetDashboardSummary = () => {
  return useQuery<DashboardSummary>({
    queryKey: ["get-dashboard-summary"],
    queryFn: async () => {
        const { data } = await instance.get("/dashboard/summary");
        return data;
    },
    refetchInterval: 30000, 
  });
};
