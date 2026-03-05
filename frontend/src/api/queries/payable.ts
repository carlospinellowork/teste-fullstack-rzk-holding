import { PaginatedResponse, Payable } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance";

interface IGetAllParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export const useGetAllPayables = ({
  page = 1,
  limit = 10,
  startDate,
  endDate,
}: IGetAllParams) => {
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
    placeholderData: (prev) => prev,
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
