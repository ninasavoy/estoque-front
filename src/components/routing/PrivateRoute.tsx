// src/components/routing/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * PrivateRoute - protege rotas que requerem autenticação.
 *
 * Uso (react-router-dom v6): <Route path="/app" element={<PrivateRoute><App /></PrivateRoute>} />
 */

type Props = {
  children: React.ReactElement;
  redirectTo?: string;
};

export default function PrivateRoute({ children, redirectTo = "/login" }: Props) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  // enquanto o auth estiver carregando, podemos exibir null ou um placeholder
  if (loading) return <div style={{ padding: 24 }}>Carregando...</div>;

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: loc }} replace />;
  }

  return children;
}
