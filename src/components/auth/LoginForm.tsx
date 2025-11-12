// src/components/auth/LoginForm.tsx
import React, { useState } from "react";

type LoginData = {
  email: string;
  senha: string;
};

type Props = {
  onSubmit: (data: LoginData) => Promise<void> | void;
  initial?: Partial<LoginData>;
};

export default function LoginForm({ onSubmit, initial }: Props) {
  const [email, setEmail] = useState(initial?.email ?? "");
  const [senha, setSenha] = useState(initial?.senha ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !senha) {
      setError("Preencha email e senha.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ email, senha });
    } catch (err: any) {
      setError(err?.message ?? "Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="login-form">
      <div style={{ display: "grid", gap: 8 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        {error && <div style={{ color: "crimson", fontSize: 13 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ padding: "10px 14px", marginTop: 6 }}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}
