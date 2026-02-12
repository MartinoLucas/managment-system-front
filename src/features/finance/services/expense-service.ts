import { apiClient } from "@/lib/api-client";

export interface ExpenseDTO {
  id: number;
  description: string;
  amount: number;
  category: string;
  invoiceFileUrl?: string;
  sourceName?: string; // Trazabilidad que agregamos en el backend
}

export const expenseService = {
  getAll: async () => {
    // El backend devuelve ApiResponse<List<ExpenseDTO>>
    const response = await apiClient.get("/finance/expenses");    
    return response.data.data; // Retornamos solo la lista de DTOs
  },
  
  create: async (data: any) => {
    const response = await apiClient.post("/finance/expenses", data);
    return response.data;
  }
};