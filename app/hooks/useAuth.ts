"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const decoded: any = jwtDecode(token);
    api.get("/users/me")
      .then((res: { data: any; }) => setUser(res.data))
      .catch(() => localStorage.removeItem("access_token"));
  }, []);

  const login = async (email: string, senha: string) => {
    const res = await api.post("/auth/token", { username: email, password: senha });
    localStorage.setItem("access_token", res.data.access_token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return { user, login, logout };
}
