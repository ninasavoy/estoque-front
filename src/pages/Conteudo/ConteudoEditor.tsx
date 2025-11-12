// src/pages/Conteudo/ConteudoEditor.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../utils/auth";

type ConteudoPayload = {
  id_medicamento: number;
  titulo: string;
  tipo: string;
  conteudo: string;
};

const TIPOS = ["doenca", "medicamento", "uso_correto", "efeitos_colaterais"];

export default function ConteudoEditor() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<ConteudoPayload>({
    id_medicamento: 0,
    titulo: "",
    tipo: "medicamento",
    conteudo: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/conteudo/${id}`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao carregar conteúdo");
      const json = await res.json();
      setForm({
        id_medicamento: json.id_medicamento,
        titulo: json.titulo,
        tipo: json.tipo,
        conteudo: json.conteudo,
      });
    } catch (err) {
      console.error(err);
      alert("Não foi possível carregar o conteúdo");
    } finally {
      setLoading(false);
    }
  }

  function handleChange<K extends keyof ConteudoPayload>(key: K, value: ConteudoPayload[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setSaving(true);
    try {
      const url = id ? `${import.meta.env.VITE_API_BASE_URL || ""}/conteudo/${id}` : `${import.meta.env.VITE_API_BASE_URL || ""}/conteudo`;
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao salvar");
      }
      const json = await res.json();
      alert("Conteúdo salvo com sucesso");
      const newId = id ? id : (json.id_conteudo ?? json.id);
      navigate(`/conteudo/${newId}`);
    } catch (err: any) {
      console.error(err);
      alert("Erro: " + (err.message || "desconhecido"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <h2>{id ? "Editar Conteúdo" : "Criar Conteúdo"}</h2>
      {loading && <p className="text-muted">Carregando...</p>}
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={handleSubmit}>
          <label className="form-group">
            <div>Id do Medicamento</div>
            <input
              className="input"
              type="number"
              value={form.id_medicamento}
              onChange={(e) => handleChange("id_medicamento", Number(e.target.value))}
              required
            />
          </label>

          <label className="form-group">
            <div>Título</div>
            <input className="input" value={form.titulo} onChange={(e) => handleChange("titulo", e.target.value)} required />
          </label>

          <label className="form-group">
            <div>Tipo</div>
            <select className="input" value={form.tipo} onChange={(e) => handleChange("tipo", e.target.value)}>
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>

          <label className="form-group">
            <div>Conteúdo</div>
            <textarea className="input" rows={8} value={form.conteudo} onChange={(e) => handleChange("conteudo", e.target.value)} />
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
