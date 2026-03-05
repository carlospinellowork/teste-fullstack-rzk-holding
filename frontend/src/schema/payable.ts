import { z } from "zod";

const PayableStatusEnum = z.enum(["PENDING", "PAID"]);

export const formSchema = z.object({
  provider: z.string().trim().min(1, { message: "Campo obrigatório" }),
  description: z.string().trim().optional(),
  amount: z.number().min(0.01, { message: "O valor deve ser maior que zero" }),
  due_date: z.string().trim().min(1, { message: "Campo obrigatório" }),
  category: z.string().trim().optional(),
  status: PayableStatusEnum,
});

export const getDefaultValues = () => ({
  provider: "",
  description: "",
  amount: 0,
  due_date: "",
  category: "",
  status: "PENDING" as const,
});
