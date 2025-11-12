// src/contexts/AuthContext.tsx
import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import authService, { UserInfo } from "../api/auth.service";

type AuthContextState = {
  user: UserInfo | null;
  loading: boolean;
  authenticated: boolean;
  permissions: string[];
  login: (email: string, senha: string) => Promise<void>;
  register: (payload: {
    nome: string;
    email: string;
    senha: string;
    tipo: "farmaceutica" | "distribuidor" | "sus" | "ubs" | "paciente" | "admin";
  }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const defaultState: AuthContextState = {
  user: null,
  loading: false,
  authenticated: false,
  permissions: [],
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshUser: async () => {},
};

export const AuthContext = createContext<AuthContextState>(defaultState);

export const AuthProvider: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<string[]>([]);

  async function loadFromToken() {
    setLoading(true);
    try {
      const token = authService.getToken();
      if (!token) {
        setUser(null);
        setPermissions([]);
        setLoading(false);
        return;
      }
      // fetch current user
      const me = await authService.me();
      setUser(me as UserInfo);
      setPermissions(me.permissions || []);
    } catch (err) {
      // token invalid or request failed -> logout
      console.warn("Auth: failed to load user from token", err);
      authService.logout();
      setUser(null);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // on mount attempt to load user from token/localStorage
    loadFromToken();
    // We don't set dependencies to keep the effect run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    try {
      const data = await authService.login({ email, senha });
      // login returns access_token, user, permissions
      const userObj = data.user as UserInfo;
      const perms = data.permissions || [];
      setUser(userObj);
      setPermissions(perms);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: {
    nome: string;
    email: string;
    senha: string;
    tipo: "farmaceutica" | "distribuidor" | "sus" | "ubs" | "paciente" | "admin";
  }) => {
    setLoading(true);
    try {
      await authService.register(payload);
      // Optionally auto-login after register -> currently we just return
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setPermissions([]);
  };

  const refreshUser = async () => {
    await loadFromToken();
  };

  const value: AuthContextState = {
    user,
    loading,
    authenticated: !!user,
    permissions,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;