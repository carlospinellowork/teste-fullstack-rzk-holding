import { PaginatedResponse, Receivable } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance";

export const useGetAllReceivables = (page: number = 1, limit: number = 10, startDate?: string, endDate?: string) => {
  return useQuery<PaginatedResponse<Receivable>>({
    queryKey: ["get-all-receivables", page, limit, startDate, endDate],
    queryFn: async () => {
        const { data } = await instance.get("/receivables", {
            params: {
              page,
              limit,
              startDate,
              endDate,
            },
        });
        return data;
    },
  });
};

export const useGetReceivableById = (id: string) => {
  return useQuery<Receivable>({
    queryKey: ["get-receivable-by-id", id],
    queryFn: async () => {
        const { data } = await instance.get(`/receivables/${id}`);
        return data;
    },
    enabled: !!id,
  });
};
