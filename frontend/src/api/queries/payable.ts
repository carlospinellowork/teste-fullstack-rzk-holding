import { PaginatedResponse, Payable } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance";

export const useGetAllPayables = (page: number = 1, limit: number = 10, startDate?: string, endDate?: string) => {
  return useQuery<PaginatedResponse<Payable>>({
    queryKey: ["get-all-payables", page, limit, startDate, endDate],
    queryFn: async () => {
      const { data } = await instance.get("/payables", {
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

export const useGetPayableById = (id: string) => {
  return useQuery<Payable>({
    queryKey: ["get-payable-by-id", id],
    queryFn: async () => {
      const { data } = await instance.get(`/payables/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

