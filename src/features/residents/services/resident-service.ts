import { apiClient } from "@/lib/api-client";

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  isPriority: boolean;
}

export const residentService = {
  getAnnouncements: async (): Promise<Announcement[]> => {
    const response = await apiClient.get("/resident/announcements");
    return response.data.data;
  },
  getMyBalance: async () => {
    const response = await apiClient.get("/resident/balance");
    return response.data.data;
  }
};