// src/pages/Feedback/FeedbackCreate.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../utils/auth";

export default function FeedbackCreate() {
  const [form, setForm] = useState({
    id_paciente: 0,
    id_medicamento: 0,
    comentario: "",
    tipo: "reacao_adversa",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/feedbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({
          id_paciente: Number(form.id_paciente),
          id_medicamento: Number(form.id_medicamento),
          comentario: form.comentario,
          tipo: form.tipo,
          data: new Date().toISOString()
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao criar feedback");
      }
      alert("Feedback criado");
      navigate(-1);
    } catch (err: any) {
      console.error(err);
      alert("Erro: " + (err.message || "desconhecido"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <h2>Criar Feedback</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={handleSubmit}>
          <label className="form-group">
            <div>Id do Paciente</div>
            <input className="input" type="number" value={form.id_paciente} onChange={(e) => setForm({ ...form, id_paciente: Number(e.target.value) })} required />
          </label>

          <label className="form-group">
            <div>Id do Medicamento</div>
            <input className="input" type="number" value={form.id_medicamento} onChange={(e) => setForm({ ...form, id_medicamento: Number(e.target.value) })} required />
          </label>

          <label className="form-group">
            <div>Tipo</div>
            <select className="input" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option value="reacao_adversa">Reação adversa</option>
              <option value="elogio">Elogio</option>
              <option value="outro">Outro</option>
            </select>
          </label>

          <label className="form-group">
            <div>Comentário</div>
            <textarea className="input" rows={6} value={form.comentario} onChange={(e) => setForm({ ...form, comentario: e.target.value })} />
          </label>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Enviando..." : "Enviar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
