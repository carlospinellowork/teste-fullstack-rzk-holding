import { z } from 'zod';

export const CreatePayableSchema = z.object({
  provider: z.string().min(1, 'Fornecedor é obrigatório'),
  description: z.string().optional(),
  amount: z.number().positive('O valor deve ser positivo'),
  due_date: z.string().transform((str) => new Date(str)),
  category: z.string().optional(),
  status: z.enum(['PENDING', 'PAID']).default('PENDING'),
});

export const UpdatePayableSchema = CreatePayableSchema.partial();
