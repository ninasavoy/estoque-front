// src/components/routing/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * PublicRoute - bloqueia acesso de usuários autenticados a páginas públicas (ex: login/register).
 * Se o usuário já estiver autenticado, redireciona para `redirectTo`.
 *
 * Uso: <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>} />
 */

type Props = {
  children: React.ReactElement;
  redirectTo?: string;
};

export default function PublicRoute({ children, redirectTo = "/" }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Carregando...</div>;

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
