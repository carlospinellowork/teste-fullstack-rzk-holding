import { Payable } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { instance } from "../instance";

export const usePostPayable = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Payable>) => {
      const response = await instance.post<Payable>("/payables", data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-payables"] });
      queryClient.invalidateQueries({ queryKey: ["get-dashboard-summary"] });
      onClose();
      toast.success("Pagamento criado com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao criar pagamento!");
    },
  });
};

export const usePutPayable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Payable> & { id: string }) => {
      const { id, ...payload } = data;
      const response = await instance.put<Payable>(`/payables/${id}`, payload);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-payables"] });
      queryClient.invalidateQueries({
        queryKey: ["get-payable-by-id", data.id],
      });
      queryClient.invalidateQueries({ queryKey: ["get-dashboard-summary"] });
      toast.success("Pagamento atualizado com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar pagamento!");
    },
  });
};

export const useDeletePayable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await instance.delete(`/payables/${id}`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-payables"] });
      queryClient.invalidateQueries({ queryKey: ["get-dashboard-summary"] });
      toast.success("Pagamento excluído com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao excluir pagamento!");
    },
  });
};
