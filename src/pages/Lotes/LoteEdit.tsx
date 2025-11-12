// src/pages/Lotes/LoteEdit.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoteForm from "../../components/forms/LoteForm";
import { LotePayload } from "../../types/lote";
import { getAuthHeader } from "../../utils/auth";

export default function LoteEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<Partial<LotePayload> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/lotes/${id}`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao carregar lote");
      const json = await res.json();
      setInitialData({
        codigo_lote: json.codigo_lote,
        data_fabricacao: json.data_fabricacao,
        data_vencimento: json.data_vencimento,
        quantidade: json.quantidade,
        id_medicamento: json.id_medicamento,
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar lote");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(payload: LotePayload) {
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${import.meta.env.VITE_API_BASE_URL || ""}/lotes/${id}`
        : `${import.meta.env.VITE_API_BASE_URL || ""}/lotes`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao salvar");
      }
      const json = await res.json();
      alert("Lote salvo com sucesso");
      navigate(`/lotes/${json.id_lote}`);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div className="container">
      <h2>{id ? "Editar Lote" : "Novo Lote"}</h2>
      <div className="card" style={{ marginTop: 12 }}>
        {/* workaround: spread as any para suprimir erro de tipagem do LoteForm */}
        <LoteForm {...({ initialData, onSubmit: handleSave } as any)} />
      </div>
    </div>
  );
}
