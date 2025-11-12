// src/pages/Medicamentos/MedicamentosList.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../utils/auth";
import { Medicamento } from "../../types/medicamento";

export default function MedicamentosList() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicamentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMedicamentos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/medicamentos`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao listar medicamentos");
      }
      const data = await res.json();
      setMedicamentos(data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente deletar este medicamento?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/medicamentos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao deletar");
      }
      // remover da lista local
      setMedicamentos((s) => s.filter((m) => m.id_medicamento !== id));
    } catch (err: any) {
      alert("Erro ao deletar: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Medicamentos</h2>
        <div>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Voltar</button>
          <Link to="/medicamentos/novo" className="btn btn-primary" style={{ marginLeft: 8 }}>
            Novo Medicamento
          </Link>
        </div>
      </div>

      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card"><strong>Erro:</strong> {error}</div>}

      <div style={{ marginTop: 12 }} className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Dosagem</th>
              <th>Preço</th>
              <th>Alto custo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="text-muted">Nenhum medicamento encontrado.</td>
              </tr>
            )}

            {medicamentos.map((m) => (
              <tr key={m.id_medicamento}>
                <td>{m.nome}</td>
                <td>{m.dosagem ?? "-"}</td>
                <td>{m.preco?.toLocaleString?.("pt-BR", { style: "currency", currency: "BRL" }) ?? "-"}</td>
                <td>{m.alto_custo ? "Sim" : "Não"}</td>
                <td>
                  <Link to={`/medicamentos/${m.id_medicamento}`} className="btn btn-ghost" style={{ marginRight: 8 }}>
                    Ver
                  </Link>
                  <Link to={`/medicamentos/${m.id_medicamento}/edit`} className="btn btn-ghost" style={{ marginRight: 8 }}>
                    Editar
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(m.id_medicamento)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
