// src/pages/Movimentacoes/UPPList.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";

type UPP = {
  id_upp: number;
  id_ubs: number;
  id_paciente: number;
  id_lote: number;
  data_envio: string;
  data_recebimento?: string | null;
  status: string;
};

export default function UPPList() {
  const [items, setItems] = useState<UPP[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/ubs-pacientes`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao listar");
      const json = await res.json();
      setItems(json || []);
    } catch (err: any) {
      console.error(err); setError(err.message || "Erro desconhecido");
    } finally { setLoading(false); }
  }

  async function confirm(id_upp: number | string) {
    if (!confirm("Confirmar recebimento pelo paciente?")) return;
    try {
      const numeric = Number(id_upp);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/ubs-pacientes/${numeric}/confirmar`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro");
      }
      alert("Confirmado");
      load();
    } catch (err: any) {
      alert("Erro: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div className="container">
      <h2>Movimentações — UBS → Paciente (UPP)</h2>
      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}
      <div className="card" style={{ marginTop: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>ID Lote</th>
              <th>Enviado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading && <tr><td colSpan={6} className="text-muted">Nenhuma movimentação</td></tr>}
            {items.map((it) => (
              <tr key={String(it.id_upp)}>
                <td>{it.id_upp}</td>
                <td>{it.id_paciente}</td>
                <td>{it.id_lote}</td>
                <td>{new Date(it.data_envio).toLocaleString()}</td>
                <td>{it.status}</td>
                <td>
                  {it.status !== "recebido" && <button className="btn btn-primary" onClick={() => confirm(it.id_upp)}>Confirmar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
