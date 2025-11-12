// src/pages/Auth/LoginPage.tsx
import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(data: { email: string; senha: string }) {
    try {
      await login(data.email, data.senha);
      navigate("/", { replace: true });
    } catch (err: any) {
      // LoginForm já exibe mensagens, mas você pode tratar aqui também
      console.error("Erro no login:", err);
      throw err;
    }
  }

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 20 }}>
      <div style={{ width: 420, maxWidth: "95%" }} className="card">
        <h2>Entrar</h2>
        <p className="text-muted">Acesse sua conta para gerenciar o estoque e rastreabilidade.</p>

        <LoginForm onSubmit={handleLogin} />

        <div style={{ marginTop: 12 }} className="text-muted">
          <Link to="/forgot-password">Esqueci minha senha</Link> · <Link to="/register">Criar conta</Link>
        </div>
      </div>
    </div>
  );
}
