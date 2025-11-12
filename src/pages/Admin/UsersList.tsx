// src/pages/Admin/UsersList.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../utils/auth";

type User = {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  ativo: boolean;
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/users`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao carregar usuários");
      const json = await res.json();
      setUsers(json || []);
    } catch (err: any) {
      console.error(err); setError(err.message || "Erro desconhecido");
    } finally { setLoading(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deletar usuário?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao deletar");
      setUsers((s) => s.filter((u) => u.id !== id));
    } catch (err: any) {
      alert("Erro: " + (err.message || "desconhecido"));
    }
  }

  return (
    <div className="container">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Usuários</h2>
        <div>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Voltar</button>
          <Link to="/admin/users/novo" className="btn btn-primary" style={{ marginLeft: 8 }}>Novo Usuário</Link>
        </div>
      </div>

      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}

      <div className="card" style={{ marginTop: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && !loading && <tr><td colSpan={5} className="text-muted">Nenhum usuário</td></tr>}
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.tipo}</td>
                <td>{u.ativo ? "Sim" : "Não"}</td>
                <td>
                  <Link to={`/admin/users/${u.id}/edit`} className="btn btn-ghost" style={{ marginRight: 8 }}>Editar</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(u.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
