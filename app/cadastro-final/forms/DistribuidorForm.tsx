"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../api/api";

export default function DistribuidorForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    contato: "",
    endereco: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/distribuidores/", form);
      alert("Cadastro de distribuidor finalizado!");
      router.push("/dashboard");
    } catch {
      alert("Erro ao finalizar cadastro de distribuidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Finalizar cadastro - Distribuidor</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input className="border p-2 rounded" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="CNPJ" value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Contato" value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Endereço" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })}/>
        <button className="bg-blue-600 text-white p-2 rounded mt-2">Salvar</button>
      </form>
    </div>
  );
}
