// src/pages/Admin/UserEdit.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../utils/auth";

type UserPayload = {
  nome: string;
  email: string;
  tipo: string;
  ativo?: boolean;
};

const TIPOS = ["admin","farmaceutica","distribuidor","sus","ubs","paciente"];

export default function UserEdit() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<UserPayload>({ nome: "", email: "", tipo: "paciente", ativo: false });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/users/${id}`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao carregar usuário");
      const json = await res.json();
      setForm({ nome: json.nome, email: json.email, tipo: json.tipo, ativo: json.ativo });
    } catch (err) {
      console.error(err);
      alert("Não foi possível carregar usuário");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setSaving(true);
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL || ""}/users/${id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao salvar");
      }
      const json = await res.json();
      alert("Usuário salvo");
      navigate("/admin/users");
    } catch (err: any) {
      console.error(err);
      alert("Erro: " + (err.message || "desconhecido"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <h2>{id ? "Editar Usuário" : "Novo Usuário"}</h2>
      {loading && <p className="text-muted">Carregando...</p>}
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={handleSubmit}>
          <label className="form-group">
            <div>Nome</div>
            <input className="input" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
          </label>

          <label className="form-group">
            <div>Email</div>
            <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>

          <label className="form-group">
            <div>Tipo</div>
            <select className="input" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>

          <label className="form-group">
            <div>Ativo</div>
            <input type="checkbox" checked={!!form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} />
          </label>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
