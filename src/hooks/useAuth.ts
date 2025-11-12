// src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Hook simples para acessar o AuthContext.
 * Retorna todos os métodos e estados do contexto.
 *
 * Exporta tanto named (useAuth) quanto default para compatibilidade.
 */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export default useAuth;
