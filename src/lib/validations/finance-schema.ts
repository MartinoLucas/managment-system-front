import { z } from "zod";

export const expenseSchema = z.object({
  description: z.string().min(5, "La descripción es muy breve"),
  amount: z.coerce.number().positive("El monto debe ser mayor a 0"),
  category: z.enum(['UTILITIES', 'SALARIES', 'MAINTENANCE', 'ADMINISTRATION', 'EXTRAORDINARY', 'TAXES'], {
    errorMap: () => ({ message: "Seleccioná una categoría válida" })
  }),
  invoiceFileUrl: z.string().url("URL de factura inválida").optional().or(z.literal("")),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;