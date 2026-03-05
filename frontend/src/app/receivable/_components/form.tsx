"use client";

import { usePostReceivable, usePutReceivable } from "@/api/mutations/receivable";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema, getDefaultValues } from "@/schema/receivable";
import { Receivable, ReceivableStatus } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type FormSchema = z.infer<typeof formSchema>;

interface ReceivableFormProps {
  onClose: () => void;
  receivableSelectedData?: Receivable | null;
}

export const ReceivableForm = ({
  onClose,
  receivableSelectedData,
}: ReceivableFormProps) => {
  const isEditing = !!receivableSelectedData;
  const { mutate: postReceivable } = usePostReceivable({ onClose });
  const { mutate: putReceivable } = usePutReceivable();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (receivableSelectedData) {
      reset({
        client: receivableSelectedData.client,
        description: receivableSelectedData.description || "",
        amount: receivableSelectedData.amount,
        due_date: new Date(receivableSelectedData.due_date).toISOString().split('T')[0],
        category: receivableSelectedData.category || "",
        status: receivableSelectedData.status as any,
      });
    } else {
      reset(getDefaultValues());
    }
  }, [receivableSelectedData, reset]);

  const onSubmit = async (data: FormSchema) => {
    if (isEditing && receivableSelectedData) {
      putReceivable({ ...data as any, id: receivableSelectedData.id }, {
        onSuccess: () => onClose()
      });
    } else {
      postReceivable(data as any);
    }
  };

  return (
    <DialogContent className="sm:max-w-106.25">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Editar Recebimento" : "Novo Recebimento"}</DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Altere os dados do recebimento abaixo."
            : "Preencha o formulário abaixo para registrar um novo recebimento."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="client">Cliente</Label>
            <Controller
              name="client"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    id="client"
                    placeholder="Nome do cliente"
                    className={error?.message ? "border-red-500" : ""}
                  />
                  <span className="text-xs text-red-500">
                    {error?.message || ""}
                  </span>
                </>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    id="description"
                    placeholder="Descrição do recebimento"
                    className={error?.message ? "border-red-500" : ""}
                  />
                  <span className="text-xs text-red-500">
                    {error?.message || ""}
                  </span>
                </>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Valor</Label>
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                      field.onChange(val);
                    }}
                    className={error?.message ? "border-red-500" : ""}
                  />
                  <span className="text-xs text-red-500">
                    {error?.message || ""}
                  </span>
                </>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="due_date">Data de Vencimento</Label>
            <Controller
              name="due_date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    id="due_date"
                    type="date"
                    className={error?.message ? "border-red-500" : ""}
                  />
                  <span className="text-xs text-red-500">
                    {error?.message || ""}
                  </span>
                </>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    id="category"
                    placeholder="Categoria do recebimento"
                    className={error?.message ? "border-red-500" : ""}
                  />
                  <span className="text-xs text-red-500">
                    {error?.message || ""}
                  </span>
                </>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value as ReceivableStatus)
                    }
                    value={field.value}
                  >
                    <SelectTrigger
                      id="status"
                      className={error?.message ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pendente</SelectItem>
                      <SelectItem value="RECEIVED">Recebido</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-xs text-red-500">
                    {error?.message || ""}
                  </span>
                </>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onClose();
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
