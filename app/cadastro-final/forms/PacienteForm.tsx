"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../api/api";

export default function PacienteForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    contato: "",
    id_ubs: "",
  });
  const [ubsList, setUbsList] = useState<any[]>([]);

  useEffect(() => {
    api.get("/ubs/")
      .then((res) => setUbsList(res.data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/pacientes/", { ...form, id_ubs: parseInt(form.id_ubs) });
      alert("Cadastro do paciente finalizado!");
      router.push("/dashboard");
    } catch {
      alert("Erro ao finalizar cadastro do paciente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Finalizar cadastro - Paciente</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input className="border p-2 rounded" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Sobrenome" value={form.sobrenome} onChange={(e) => setForm({ ...form, sobrenome: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="CPF" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Contato" value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })}/>
        <select className="border p-2 rounded" value={form.id_ubs} onChange={(e) => setForm({ ...form, id_ubs: e.target.value })}>
          <option value="">Selecione a UBS</option>
          {ubsList.map((u) => (
            <option key={u.id_ubs} value={u.id_ubs}>{u.nome}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white p-2 rounded mt-2">Salvar</button>
      </form>
    </div>
  );
}
