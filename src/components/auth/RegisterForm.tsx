// src/components/auth/RegisterForm.tsx
import React, { useState } from "react";

type RegisterData = {
  nome: string;
  email: string;
  senha: string;
  tipo: string;
};

type Props = {
  onSubmit: (data: RegisterData) => Promise<void> | void;
  initial?: Partial<RegisterData>;
};

export default function RegisterForm({ onSubmit, initial }: Props) {
  const [nome, setNome] = useState(initial?.nome ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [senha, setSenha] = useState(initial?.senha ?? "");
  const [tipo, setTipo] = useState(initial?.tipo ?? "farmaceutica");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nome || !email || !senha || !tipo) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ nome, email, senha, tipo });
    } catch (err: any) {
      setError(err?.message ?? "Erro ao registrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="register-form">
      <div style={{ display: "grid", gap: 8 }}>
        <label style={{ color: "white", display: "flex", flexDirection: "column" }}>
          Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} required style={{ padding: 8, marginTop: 6, borderRadius: 10 }} />
        </label>

        <label style={{ color: "white", display: "flex", flexDirection: "column" }}>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: 8, marginTop: 6, borderRadius: 10 }} />
        </label>

        <label style={{ color: "white", display: "flex", flexDirection: "column" }}>
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required style={{ padding: 8, marginTop: 6, borderRadius: 10 }} />
        </label>

        <label style={{ color: "white", display: "flex", flexDirection: "column" }}>
          Tipo de conta
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ padding: 8, marginTop: 6 }}>
            <option value="farmaceutica">Farmacêutica</option>
            <option value="distribuidor">Distribuidor</option>
            <option value="sus">SUS</option>
            <option value="ubs">UBS</option>
            <option value="paciente">Paciente</option>
          </select>
        </label>

        {error && <div style={{ color: "crimson", fontSize: 13 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ padding: "10px 14px", marginTop: 6 }}>
          {loading ? "Registrando..." : "Criar conta"}
        </button>
      </div>
    </form>
  );
}
