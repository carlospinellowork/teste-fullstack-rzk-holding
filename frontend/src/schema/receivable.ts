import { z } from "zod";

const ReceivableStatusEnum = z.enum(["PENDING", "RECEIVED"]);

export const formSchema = z.object({
  client: z.string().trim().min(1, { message: "Campo obrigatório" }),
  description: z.string().trim().min(0).optional(),
  amount: z.number().min(0.01, { message: "O valor deve ser maior que zero" }),
  due_date: z.string().trim().min(1, { message: "Campo obrigatório" }),
  category: z.string().trim().min(0).optional(),
  status: ReceivableStatusEnum,
});

export const getDefaultValues = () => ({
  client: "",
  description: "",
  amount: 0,
  due_date: "",
  category: "",
  status: "PENDING" as const,
});
