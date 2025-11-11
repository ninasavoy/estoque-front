"use client";
import { useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", email: "", senha: "", tipo: "paciente" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/users/", {
        nome: form.nome,
        email: form.email,
        senha_hash: form.senha,
        tipo: form.tipo,
      });
      router.push("/auth/login");
    } catch (err) {
      alert("Erro ao criar usuário");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input className="border p-2 rounded" placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Senha" type="password" value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })}/>
        <select className="border p-2 rounded" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
          <option value="farmaceutica">Farmacêutica</option>
          <option value="distribuidor">Distribuidor</option>
          <option value="sus">SUS</option>
          <option value="ubs">UBS</option>
          <option value="paciente">Paciente</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-600 text-white p-2 rounded mt-2">Cadastrar</button>
      </form>
    </div>
  );
}
