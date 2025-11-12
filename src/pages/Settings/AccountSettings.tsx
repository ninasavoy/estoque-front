// src/pages/Settings/AccountSettings.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

type Me = {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  permissions?: string[];
};

export default function AccountSettings() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ old_password: "", new_password: "" });
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/auth/me`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const json = await res.json();
      setMe(json);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e?: React.FormEvent) {
    e?.preventDefault();
    setChangingPassword(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ old_password: passwords.old_password, new_password: passwords.new_password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao alterar senha");
      }
      alert("Senha alterada com sucesso");
      setPasswords({ old_password: "", new_password: "" });
    } catch (err: any) {
      console.error(err);
      alert("Erro: " + (err.message || "desconhecido"));
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div className="container">
      <h2>Configurações da Conta</h2>
      {loading && <p className="text-muted">Carregando...</p>}
      {me && (
        <div className="card" style={{ marginTop: 12 }}>
          <p><strong>Nome:</strong> {me.nome}</p>
          <p><strong>Email:</strong> {me.email}</p>
          <p><strong>Tipo:</strong> {me.tipo}</p>

          <hr />

          <h3>Alterar senha</h3>
          <form onSubmit={handleChangePassword}>
            <label className="form-group">
              <div>Senha atual</div>
              <input type="password" className="input" value={passwords.old_password} onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })} required />
            </label>
            <label className="form-group">
              <div>Nova senha</div>
              <input type="password" className="input" value={passwords.new_password} onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })} required />
            </label>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Voltar</button>
              <button type="submit" className="btn btn-primary" disabled={changingPassword}>{changingPassword ? "Alterando..." : "Alterar senha"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
