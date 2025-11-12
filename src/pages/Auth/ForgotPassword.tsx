// src/pages/Auth/ForgotPassword.tsx
import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend não tem rota de recuperação explicitada; aqui apenas simulação.
      await new Promise((r) => setTimeout(r, 800));
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao solicitar recuperação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 20 }}>
      <div className="card" style={{ width: 480, maxWidth: "95%" }}>
        <h2>Recuperar senha</h2>
        {!sent ? (
          <>
            <p className="text-muted">Informe o e-mail cadastrado para receber instruções de recuperação.</p>
            <form onSubmit={handleSubmit}>
              <label className="text-muted">E-mail</label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button className="btn btn-ghost" type="button" onClick={() => (window.location.href = "/login")}>
                  Voltar
                </button>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar instruções"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div>
            <p>E-mail enviado — verifique sua caixa de entrada (simulado).</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-primary" onClick={() => (window.location.href = "/login")}>
                Voltar ao login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
