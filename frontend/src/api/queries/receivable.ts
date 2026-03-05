import { PaginatedResponse, Receivable } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance";

interface IGetAllParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export const useGetAllReceivables = ({
  page = 1,
  limit = 10,
  startDate,
  endDate,
}: IGetAllParams) => {
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
    placeholderData: (prev) => prev,
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
