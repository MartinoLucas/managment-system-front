"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Definimos la interfaz de cómo viene el JWT desde Java
interface JwtIncomingPayload {
  sub: string;
  roles: { authority: string }[]; // Formato original: [{authority: "ROLE_ADMIN"}]
  firstName: string;
  lastName: string;
}

// Definimos la interfaz de cómo queremos el usuario en el Front
interface UserPayload {
  email: string;
  roles: string[]; // Formato limpio: ["ADMIN"]
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: UserPayload | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función helper para limpiar los roles de Spring Security
  const processToken = (tkn: string): UserPayload => {
    const decoded = jwtDecode<JwtIncomingPayload>(tkn);
    console.log(decoded);
    
    return {
      email: decoded.sub,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      // Transformación: [{authority: "ROLE_ADMIN"}] => ["ROLE_ADMIN"]
      roles: decoded.roles.map(r => r.authority)
    };
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      try {
        const userData = processToken(storedToken);
        setToken(storedToken);
        setUser(userData);
      } catch (e) {
        localStorage.removeItem("auth_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    const userData = processToken(newToken);
    setToken(newToken);    
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    window.location.href = "/auth/login";
  };
  
  // Ahora isAdmin es una comparación limpia de strings
  const isAdmin = user?.roles.includes("ADMIN_AD_HONOREM") || false;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated: !!token, 
      isAdmin, 
      isLoading,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};