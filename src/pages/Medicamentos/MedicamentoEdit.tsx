// src/pages/Medicamentos/MedicamentoEdit.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MedicamentoForm from "../../components/forms/MedicamentoForm";
import { getAuthHeader } from "../../utils/auth";
import { MedicamentoPayload } from "../../types/medicamento";

export default function MedicamentoEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<Partial<MedicamentoPayload> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/medicamentos/${id}`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao carregar medicamento");
      const json = await res.json();
      setInitialData({
        nome: json.nome,
        ingestao: json.ingestao,
        dosagem: json.dosagem,
        preco: json.preco,
        alto_custo: json.alto_custo,
      });
    } catch (err) {
      console.error(err);
      alert("Não foi possível carregar dados do medicamento");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(payload: MedicamentoPayload) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/medicamentos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao salvar");
      }
      const json = await res.json();
      alert("Medicamento atualizado");
      navigate(`/medicamentos/${json.id_medicamento}`);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div className="container">
      <h2>{id ? "Editar Medicamento" : "Novo Medicamento"}</h2>
      {loading && <p className="text-muted">Carregando...</p>}
      <div className="card" style={{ marginTop: 12 }}>
        <MedicamentoForm {...({ initialData, onSubmit: handleSave } as any)} />
      </div>
    </div>
  );
}
