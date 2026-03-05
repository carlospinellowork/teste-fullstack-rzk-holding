import { Receivable } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { instance } from "../instance";

export const usePostReceivable = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Receivable>) => {
      const response = await instance.post<Receivable>("/receivables", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-receivables"] });
      queryClient.invalidateQueries({ queryKey: ["get-dashboard-summary"] });
      onClose();
      toast.success("Recebimento criado com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao criar recebimento!");
    },
  });
};

export const usePutReceivable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Receivable> & { id: string }) => {
      const { id, ...payload } = data;
      const response = await instance.put<Receivable>(`/receivables/${id}`, payload);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-receivables"] });
      queryClient.invalidateQueries({ queryKey: ["get-receivable-by-id", data.id] });
      queryClient.invalidateQueries({ queryKey: ["get-dashboard-summary"] });
      toast.success("Recebimento atualizado com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar recebimento!");
    },
  });
};

export const useDeleteReceivable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await instance.delete(`/receivables/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-receivables"] });
      queryClient.invalidateQueries({ queryKey: ["get-dashboard-summary"] });
      toast.success("Recebimento excluído com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao excluir recebimento!");
    },
  });
};

