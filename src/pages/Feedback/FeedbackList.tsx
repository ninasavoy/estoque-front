// src/pages/Feedback/FeedbackList.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";

type Feedback = {
  id_feedback: number;
  id_paciente: number;
  id_medicamento: number;
  comentario: string;
  tipo: string;
  data: string;
};

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/feedbacks`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao carregar feedbacks");
      const json = await res.json();
      setFeedbacks(json || []);
    } catch (err: any) {
      console.error(err); setError(err.message || "Erro desconhecido");
    } finally { setLoading(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deletar feedback?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/feedbacks/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao deletar");
      setFeedbacks((s) => s.filter((f) => f.id_feedback !== id));
    } catch (err: any) {
      alert("Erro: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div className="container">
      <h2>Feedbacks</h2>
      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}

      <div className="card" style={{ marginTop: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Medicamento</th>
              <th>Tipo</th>
              <th>Comentário</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 && !loading && <tr><td colSpan={6} className="text-muted">Nenhum feedback</td></tr>}
            {feedbacks.map((f) => (
              <tr key={f.id_feedback}>
                <td>{f.id_paciente}</td>
                <td>{f.id_medicamento}</td>
                <td>{f.tipo}</td>
                <td style={{ maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.comentario}</td>
                <td>{new Date(f.data).toLocaleString()}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(f.id_feedback)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
