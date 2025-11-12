// src/pages/Dashboard/SUSDashboard.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";
import SmallStats from "../../components/visual/SmallStats";
import Timeline from "../../components/visual/Timeline";
import { formatDateISO } from "../../utils/date";

export default function SUSDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/dashboard/sus/gerencial`, {
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
      <h2>Dashboard — SUS (Gerencial)</h2>

      {loading && <p className="text-muted">Carregando dados...</p>}
      {error && <div className="card"><strong>Erro:</strong> {error}</div>}

      {data && (
        <>
          <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            <SmallStats title="Recebidos" value={String(data.estoque?.recebidos ?? 0)} />
            <SmallStats title="Distribuídos (UBS)" value={String(data.estoque?.distribuidos_ubs ?? 0)} />
            <SmallStats title="Em estoque" value={String(data.estoque?.em_estoque ?? 0)} />
            <SmallStats title="Lotes p/ atenção" value={String(data.alertas?.lotes_vencimento_proximo ?? 0)} variant="danger" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 12, marginTop: 16 }}>
            <div className="card">
              <h3>Lotes em atenção</h3>
              <Timeline items={(data.lotes_atencao || []).map((l: any) => ({
                title: l.codigo,
                subtitle: `Vence em ${l.dias_restantes} dias`,
                date: l.vencimento,
                meta: `Qtd: ${l.quantidade}`
              }))} />
            </div>

            <div className="card">
              <h3>Alertas</h3>
              <p className="text-muted">Necessita remanejamento: {data.alertas?.necessita_remanejamento ?? 0}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
