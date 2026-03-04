import { z } from 'zod';

export const CreateReceivableSchema = z.object({
  client: z.string().min(1, 'Cliente é obrigatório'),
  description: z.string().optional(),
  amount: z.number().positive('O valor deve ser positivo'),
  due_date: z.string().transform((str) => new Date(str)),
  category: z.string().optional(),
  status: z.enum(['PENDING', 'RECEIVED']).default('PENDING'),
});

export const UpdateReceivableSchema = CreateReceivableSchema.partial();
