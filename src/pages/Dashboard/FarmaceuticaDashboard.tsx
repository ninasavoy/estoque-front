// src/pages/Dashboard/FarmaceuticaDashboard.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";
import SmallStats from "../../components/visual/SmallStats";
import Timeline from "../../components/visual/Timeline";
import { formatDateISO } from "../../utils/date";

export default function FarmaceuticaDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/dashboard/farmaceutica/overview`, {
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
      <h2>Dashboard — Farmacêutica</h2>
      {loading && <p className="text-muted">Carregando dados...</p>}
      {error && <div className="card"><strong>Erro:</strong> {error}</div>}

      {data && (
        <>
          <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            <SmallStats title="Medicamentos (total)" value={String(data.medicamentos?.total ?? 0)} />
            <SmallStats title="Lotes (total)" value={String(data.medicamentos?.lotes_total ?? 0)} />
            <SmallStats title="Lotes vencidos" value={String(data.medicamentos?.lotes_vencidos ?? 0)} variant="danger" />
            <SmallStats title="Lotes perto do vencimento" value={String(data.medicamentos?.lotes_proximos_vencimento ?? 0)} />
            <SmallStats title="Taxa de entrega (%)" value={String(data.rastreamento?.taxa_entrega ?? 0)} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 12, marginTop: 16 }}>
            <div className="card">
              <h3>Linha do tempo de movimentações recentes</h3>
              {/* Timeline component espera props; aqui simplificamos */}
              <Timeline items={(data.lotes_atencao || []).map((l: any) => ({
                title: l.codigo || `Lote ${l.id_lote}`,
                subtitle: `Vencimento: ${formatDateISO(l.vencimento)}`,
                date: l.vencimento,
                meta: `Qtd: ${l.quantidade}`
              }))} />
            </div>

            <div className="card">
              <h3>Alertas rápidos</h3>
              <ul>
                <li>Feedbacks totais: {data["feedbacks e conteúdos"]?.total ?? 0}</li>
                <li>Conteúdos educacionais: {data["feedbacks e conteúdos"]?.conteudo_educacional ?? 0}</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
