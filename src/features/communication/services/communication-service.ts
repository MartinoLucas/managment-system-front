import { apiClient } from "@/lib/api-client";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  // Agregá otros campos según tu modelo de Java 'Post'
}

export interface TicketDTO {
  id: number;
  description: string;
  status: string;
  // Mapea con TicketDTO de Java
}

export const communicationService = {
  // GET /api/v1/communication/posts
  getPosts: async (): Promise<Post[]> => {
    const response = await apiClient.get("/communication/posts");
    return response.data.data;
  },

  // POST /api/v1/communication/tickets
  createTicket: async (ticketData: any): Promise<TicketDTO> => {
    const response = await apiClient.post("/communication/tickets", ticketData);
    return response.data.data;
  },

  // PATCH /api/v1/communication/tickets/{id}/status
  updateTicketStatus: async (id: number, status: string): Promise<TicketDTO> => {
    const response = await apiClient.patch(`/communication/tickets/${id}/status?status=${status}`);
    return response.data.data;
  }
};