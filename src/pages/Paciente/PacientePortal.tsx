// src/pages/Paciente/PacientePortal.tsx
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";

type Paciente = {
  id_paciente: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  contato: string;
  id_ubs: number;
};

export default function PacientePortal() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/pacientes`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error("Erro ao carregar pacientes");
      const json = await res.json();
      setPacientes(json || []);
    } catch (err: any) {
      console.error(err); setError(err.message || "Erro desconhecido");
    } finally { setLoading(false); }
  }

  return (
    <div className="container">
      <h2>Portal do Paciente</h2>
      <p className="text-muted">Aqui o paciente pode ver seu cadastro, histórico e interagir com a farmacêutica.</p>

      {loading && <p className="text-muted">Carregando...</p>}
      {error && <div className="card">Erro: {error}</div>}

      <div className="card" style={{ marginTop: 12 }}>
        {pacientes.length === 0 && !loading && <p className="text-muted">Nenhum paciente encontrado para este usuário.</p>}
        {pacientes.map((p) => (
          <div key={p.id_paciente} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            <strong>{p.nome} {p.sobrenome}</strong> — CPF: {p.cpf} — UBS: {p.id_ubs}
            <div style={{ marginTop: 6 }}>
              {/* links para funcionalidades futuras */}
              <button className="btn btn-ghost" style={{ marginRight: 6 }}>Ver histórico</button>
              <button className="btn btn-ghost">Cadastrar medicamento recebido</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
