// src/pages/Movimentacoes/ConfirmacaoPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Página genérica que pode ser usada quando a confirmação
 * vem via link (ex: /confirmacao/dps/123). Implementação simples:
 * - Faz chamada ao endpoint de confirmação conforme o tipo passado.
 *
 * OBS: Seu backend não fornece rota de confirmação via GET link,
 * mas deixo este arquivo como utilitário caso queira usar.
 */

export default function ConfirmacaoPage() {
  const { tipo, id } = useParams<{ tipo?: string; id?: string }>();
  const navigate = useNavigate();

  async function confirmar() {
    if (!tipo || !id) return;
    try {
      const resource = tipo === "dps" ? "distribuidores-sus" : tipo === "spu" ? "sus-ubs" : "ubs-pacientes";
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/${resource}/${id}/confirmar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro");
      }
      alert("Confirmação realizada com sucesso.");
      navigate("/", { replace: true });
    } catch (err: any) {
      alert("Erro ao confirmar: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "50vh", padding: 20 }}>
      <div className="card" style={{ width: 560, maxWidth: "95%", textAlign: "center" }}>
        <h2>Confirmar movimentação</h2>
        <p className="text-muted">Tipo: {tipo} — ID: {id}</p>
        <p>Se esta página foi aberta por engano, volte. Caso contrário, confirme abaixo.</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Voltar</button>
          <button className="btn btn-primary" onClick={confirmar}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
