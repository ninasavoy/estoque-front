// src/pages/Lotes/LoteDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lote } from "../../types/lote";
import { getAuthHeader } from "../../utils/auth";

export default function LoteDetail() {
  const { id } = useParams<{ id: string }>();
  const [lote, setLote] = useState<Lote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/lotes/${id}`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro");
      }
      const json = await res.json();
      setLote(json);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Detalhes do Lote</h2>
        <div>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Voltar</button>
          {lote && <Link to={`/lotes/${lote.id_lote}/edit`} className="btn btn-primary" style={{ marginLeft: 8 }}>Editar</Link>}
        </div>
      </div>

      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}

      {lote && (
        <div className="card" style={{ marginTop: 12 }}>
          <h3>{lote.codigo_lote}</h3>
          <p><strong>Medicamento:</strong> {lote.medicamento?.nome ?? "—"}</p>
          <p><strong>Fabricação:</strong> {new Date(lote.data_fabricacao).toLocaleDateString()}</p>
          <p><strong>Validade:</strong> {new Date(lote.data_vencimento).toLocaleDateString()}</p>
          <p><strong>Quantidade:</strong> {lote.quantidade}</p>
        </div>
      )}
    </div>
  );
}
