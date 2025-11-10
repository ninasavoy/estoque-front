"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../api/api";

export default function SUSForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    regiao: "",
    contato_gestor: "",
    nome_gestor: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/sus/", form);
      alert("Cadastro do SUS finalizado!");
      router.push("/dashboard");
    } catch {
      alert("Erro ao finalizar cadastro do SUS.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Finalizar cadastro - SUS</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input className="border p-2 rounded" placeholder="Região" value={form.regiao} onChange={(e) => setForm({ ...form, regiao: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Nome do Gestor" value={form.nome_gestor} onChange={(e) => setForm({ ...form, nome_gestor: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Contato do Gestor" value={form.contato_gestor} onChange={(e) => setForm({ ...form, contato_gestor: e.target.value })}/>
        <button className="bg-blue-600 text-white p-2 rounded mt-2">Salvar</button>
      </form>
    </div>
  );
}
