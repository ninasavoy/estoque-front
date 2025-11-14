// src/pages/Auth/RegisterPage.tsx
import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(data: { nome: string; email: string; senha: string; tipo: "farmaceutica" | "distribuidor" | "sus" | "ubs" | "paciente" | "admin" }) {
    try {
      await register(data);
      // após registro, normalmente redirecionamos ao login
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Erro ao registrar:", err);
      throw err;
    }
  }

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 20 }}>
      <div style={{ width: 520, maxWidth: "95%", backgroundColor: "#3b3b3b" }} className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <img
            src="/logo.png"
            alt="Logo TCS"
            style={{
              width: 160,
              height: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)", // mantém o logo branco visível
            }}
          />
        </div>
        <h2 style={{ color: "white" }}>Registrar nova conta</h2>
        <p className="text-muted" style={{ color: "#a9a9a9" }}>Crie uma conta para começar a usar a plataforma.</p>

        <RegisterForm onSubmit={handleRegister} />

        <div style={{ marginTop: 12, color: "#a9a9a9" }} className="text-muted" >
          Já tem conta? <a href="/login" style={{ color: "white" }}>Entrar</a>
        </div>
      </div>
    </div>
  );
}
