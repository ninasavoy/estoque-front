// src/api/auth.service.ts
import api from "./client";

export type LoginRequest = {
  email: string;
  senha: string;
};

export type RegisterRequest = {
  nome: string;
  email: string;
  senha: string;
  tipo: "farmaceutica" | "distribuidor" | "sus" | "ubs" | "paciente" | "admin";
};

export type UserInfo = {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  permissions?: string[];
};

export default {
  async login(payload: LoginRequest) {
    const res = await api.post("/auth/login", payload);
    // Expected response has access_token, token_type, user, permissions
    const data = res.data;
    if (data?.access_token) {
      localStorage.setItem("access_token", data.access_token);
    }
    return data;
  },

  async register(payload: RegisterRequest) {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },

  async logout() {
    localStorage.removeItem("access_token");
    return true;
  },

  async me(): Promise<{ id: number; nome: string; email: string; tipo: string; permissions: string[] }> {
    const res = await api.get("/auth/me");
    return res.data;
  },

  async changePassword(oldPassword: string, newPassword: string) {
    const res = await api.post("/auth/change-password", {
      old_password: oldPassword,
      new_password: newPassword,
    });
    return res.data;
  },

  getToken() {
    return localStorage.getItem("access_token");
  },

  setToken(token: string) {
    localStorage.setItem("access_token", token);
  }
};
