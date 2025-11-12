// src/pages/Movimentacoes/DPSList.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";

type DPS = {
  id_dps: number;
  id_distribuidor: number;
  id_sus: number;
  id_lote: number;
  quantidade: number;
  data_envio: string;
  data_recebimento?: string | null;
  status: string;
};

export default function DPSList() {
  const [items, setItems] = useState<DPS[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/distribuidores-sus`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao listar movimentações");
      const json = await res.json();
      setItems(json || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function confirmDPS(id: number) {
    if (!window.confirm("Confirmar recebimento desta movimentação no SUS?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/distribuidores-sus/${id}/confirmar`, {
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
      <h2>Movimentações — Distribuidor → SUS (DPS)</h2>
      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}

      <div className="card" style={{ marginTop: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Lote</th>
              <th>Qtd</th>
              <th>Enviado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading && <tr><td colSpan={6} className="text-muted">Nenhuma movimentação</td></tr>}
            {items.map((it) => (
              <tr key={it.id_dps}>
                <td>{it.id_dps}</td>
                <td>{it.id_lote}</td>
                <td>{it.quantidade}</td>
                <td>{new Date(it.data_envio).toLocaleString()}</td>
                <td>{it.status}</td>
                <td>
                  {it.status !== "recebido" && <button className="btn btn-primary" onClick={() => confirmDPS(it.id_dps)}>Confirmar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
