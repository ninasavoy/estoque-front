// src/pages/Lotes/LotesList.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lote } from "../../types/lote";
import { getAuthHeader } from "../../utils/auth";

export default function LotesList() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchLotes() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/lotes`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao listar lotes");
      }
      const json = await res.json();
      setLotes(json || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Confirma remoção do lote?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/lotes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro");
      }
      setLotes((s) => s.filter((l) => l.id_lote !== id));
    } catch (err: any) {
      alert("Erro ao deletar: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Lotes</h2>
        <div>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Voltar</button>
          <Link to="/lotes/novo" className="btn btn-primary" style={{ marginLeft: 8 }}>Novo Lote</Link>
        </div>
      </div>

      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}

      <div className="card" style={{ marginTop: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Medicamento</th>
              <th>Validade</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lotes.length === 0 && !loading && (
              <tr><td colSpan={5} className="text-muted">Nenhum lote encontrado</td></tr>
            )}
            {lotes.map((l) => (
              <tr key={l.id_lote}>
                <td><Link to={`/lotes/${l.id_lote}`}>{l.codigo_lote}</Link></td>
                <td>{l.medicamento?.nome ?? "—"}</td>
                <td>{new Date(l.data_vencimento).toLocaleDateString()}</td>
                <td>{l.quantidade}</td>
                <td>
                  <Link to={`/lotes/${l.id_lote}`} className="btn btn-ghost" style={{ marginRight: 8 }}>Ver</Link>
                  <Link to={`/lotes/${l.id_lote}/edit`} className="btn btn-ghost" style={{ marginRight: 8 }}>Editar</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(l.id_lote)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
