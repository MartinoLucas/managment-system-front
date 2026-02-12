import { apiClient } from "@/lib/api-client";

export interface PendingUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export const adminService = {
  getPendingUsers: async (): Promise<PendingUser[]> => {
    const response = await apiClient.get("/admin/users/pending");
    return response.data.data;
  },
  
  approveUser: async (id: number, role: string) => {
    const response = await apiClient.patch(`/admin/users/${id}/approve?role=${role}`);
    return response.data;
  },

  rejectUser: async (id: number) => {
    const response = await apiClient.delete(`/admin/users/${id}/reject`);
    return response.data;
  }
};