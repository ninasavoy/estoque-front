// src/pages/Dashboard/UBSDashboard.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";
import SmallStats from "../../components/visual/SmallStats";

export default function UBSDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/dashboard/ubs/estoque`, {
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
      <h2>Dashboard — UBS</h2>
      {loading && <p className="text-muted">Carregando dados...</p>}
      {error && <div className="card"><strong>Erro:</strong> {error}</div>}

      {data && (
        <>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <SmallStats title="Total recebido" value={String(data.estoque?.total_recebido ?? 0)} />
            <SmallStats title="Distribuído a pacientes" value={String(data.estoque?.distribuido_pacientes ?? 0)} />
            <SmallStats title="Em estoque" value={String(data.estoque?.em_estoque ?? 0)} />
          </div>

          <div style={{ marginTop: 16 }} className="card">
            <h3>Distribuições recentes</h3>
            <ul>
              {(data.distribuicoes_recentes || []).map((d: any) => (
                <li key={d.id}>
                  <strong>ID:</strong> {d.id} — Paciente: {d.id_paciente} — Lote: {d.id_lote} — {d.status}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
