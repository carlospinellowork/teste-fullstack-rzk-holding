"use client";

import { usePostPayable, usePutPayable } from "@/api/mutations/payable";
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
import { formSchema, getDefaultValues } from "@/schema/payable";
import { Payable, PayableStatus } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type FormSchema = z.infer<typeof formSchema>;

interface PayableFormProps {
  onClose: () => void;
  payableSelectedData?: Payable | null;
}

export const PayableForm = ({
  onClose,
  payableSelectedData,
}: PayableFormProps) => {
  const isEditing = !!payableSelectedData;
  const { mutate: postPayable } = usePostPayable({ onClose });
  const { mutate: putPayable } = usePutPayable();

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
    if (payableSelectedData) {
      reset({
        provider: payableSelectedData.provider,
        description: payableSelectedData.description || "",
        amount: payableSelectedData.amount,
        due_date: new Date(payableSelectedData.due_date).toISOString().split('T')[0],
        category: payableSelectedData.category || "",
        status: payableSelectedData.status,
      });
    } else {
      reset(getDefaultValues());
    }
  }, [payableSelectedData, reset]);

  const onSubmit = async (data: FormSchema) => {
    if (isEditing && payableSelectedData) {
      putPayable({ ...data, id: payableSelectedData.id }, {
        onSuccess: () => onClose()
      });
    } else {
      postPayable(data);
    }
  };

  return (
    <DialogContent className="sm:max-w-106.25">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Editar Pagamento" : "Novo Pagamento"}</DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Altere os dados do pagamento abaixo."
            : "Preencha o formulário abaixo para criar um novo pagamento."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="provider">Fornecedor</Label>
            <Controller
              name="provider"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    id="provider"
                    placeholder="Nome do fornecedor"
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
                    placeholder="Descrição do pagamento"
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
                    placeholder="Categoria do pagamento"
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
                      field.onChange(value as PayableStatus)
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
                      <SelectItem value="PAID">Pago</SelectItem>
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

