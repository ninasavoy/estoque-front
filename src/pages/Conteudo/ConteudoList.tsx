// src/pages/Conteudo/ConteudoList.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../utils/auth";

type Conteudo = {
  id_conteudo: number;
  id_medicamento: number;
  titulo: string;
  tipo: string;
  conteudo: string;
  data_criacao: string;
};

export default function ConteudoList() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/conteudo`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro ao listar conteúdo");
      }
      const json = await res.json();
      setConteudos(json || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja deletar este conteúdo?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/conteudo/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || res.statusText || "Erro");
      }
      setConteudos((s) => s.filter((c) => c.id_conteudo !== id));
    } catch (err: any) {
      alert("Erro ao deletar: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div className="container">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Conteúdos Educacionais</h2>
        <div>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Voltar</button>
          <Link to="/conteudo/novo" className="btn btn-primary" style={{ marginLeft: 8 }}>Novo Conteúdo</Link>
        </div>
      </div>

      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}

      <div className="card" style={{ marginTop: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Medicamento</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {conteudos.length === 0 && !loading && <tr><td colSpan={5} className="text-muted">Nenhum conteúdo</td></tr>}
            {conteudos.map((c) => (
              <tr key={c.id_conteudo}>
                <td>{c.titulo}</td>
                <td>{c.tipo}</td>
                <td>{c.id_medicamento}</td>
                <td>{new Date(c.data_criacao).toLocaleString()}</td>
                <td>
                  <Link to={`/conteudo/${c.id_conteudo}/edit`} className="btn btn-ghost" style={{ marginRight: 8 }}>Editar</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(c.id_conteudo)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
