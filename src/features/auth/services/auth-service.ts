import { apiClient } from "@/lib/api-client";
import { LoginSchemaType, RegisterSchemaType } from "@/lib/validations";

export const authService = {
  login: async (data: LoginSchemaType) => {
    const response = await apiClient.post("/auth/login", data);
    // Guardamos el token si la respuesta es exitosa
    if (response.data.success) {
      localStorage.setItem("auth_token", response.data.data.token);
    }
    return response.data;
  },

  register: async (data: RegisterSchemaType) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/auth/login";
  }
};