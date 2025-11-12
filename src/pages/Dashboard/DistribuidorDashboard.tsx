// src/pages/Dashboard/DistribuidorDashboard.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";
import SmallStats from "../../components/visual/SmallStats";

export default function DistribuidorDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/dashboard/distribuidor/logistica`, {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || res.statusText || "Erro ao buscar dashboard");
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard — Distribuidor</h2>
      {loading && <p className="text-muted">Carregando dados...</p>}
      {error && <div className="card"><strong>Erro:</strong> {error}</div>}

      {data && (
        <>
          <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            <SmallStats title="Pendentes" value={String(data.entregas?.pendentes ?? 0)} />
            <SmallStats title="Concluídas" value={String(data.entregas?.concluidas ?? 0)} />
            <SmallStats title="Tempo médio (dias)" value={String(data.entregas?.tempo_medio_dias ?? 0)} />
          </div>

          <div style={{ marginTop: 16 }} className="card">
            <h3>Últimas entregas pendentes</h3>
            <ul>
              {(data.pendentes_detalhes || []).map((p: any) => (
                <li key={p.id}>
                  <strong>ID:</strong> {p.id} — <span className="text-muted">Lote: {p.id_lote}</span> — {p.status}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
