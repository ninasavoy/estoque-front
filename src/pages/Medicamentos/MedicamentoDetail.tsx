// src/pages/Medicamentos/MedicamentoDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Medicamento } from "../../types/medicamento";
import { getAuthHeader } from "../../utils/auth";

export default function MedicamentoDetail() {
  const { id } = useParams<{ id: string }>();
  const [med, setMed] = useState<Medicamento | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetchMedicamento();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchMedicamento() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/medicamentos/${id}`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao buscar medicamento");
      }
      const json = await res.json();
      setMed(json);
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
        <h2>Detalhes do Medicamento</h2>
        <div>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Voltar</button>
          {med && <Link to={`/medicamentos/${med.id_medicamento}/edit`} className="btn btn-primary" style={{ marginLeft: 8 }}>Editar</Link>}
        </div>
      </div>

      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}

      {med && (
        <div style={{ marginTop: 12 }} className="card">
          <h3>{med.nome}</h3>
          <p><strong>Dosagem:</strong> {med.dosagem ?? "-"}</p>
          <p><strong>Via de ingestão:</strong> {med.ingestao ?? "-"}</p>
          <p><strong>Preço:</strong> {med.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          <p><strong>Alto custo:</strong> {med.alto_custo ? "Sim" : "Não"}</p>

          <section style={{ marginTop: 12 }}>
            <h4>Lotes relacionados</h4>
            {med.lotes && med.lotes.length > 0 ? (
              <ul>
                {med.lotes.map((l) => (
                  <li key={l.id_lote}>
                    <Link to={`/lotes/${l.id_lote}`}>{l.codigo_lote}</Link> — Val: {new Date(l.data_vencimento).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Nenhum lote cadastrado.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
