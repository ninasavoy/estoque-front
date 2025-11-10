"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../api/api";

export default function UBSForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    contato: "",
    endereco: "",
    id_sus: "",
  });
  const [susList, setSusList] = useState<any[]>([]);

  useEffect(() => {
    api.get("/sus/")
      .then((res) => setSusList(res.data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/ubs/", { ...form, id_sus: parseInt(form.id_sus) });
      alert("Cadastro da UBS finalizado!");
      router.push("/dashboard");
    } catch {
      alert("Erro ao finalizar cadastro da UBS.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Finalizar cadastro - UBS</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input className="border p-2 rounded" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Contato" value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })}/>
        <input className="border p-2 rounded" placeholder="Endereço" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })}/>
        <select className="border p-2 rounded" value={form.id_sus} onChange={(e) => setForm({ ...form, id_sus: e.target.value })}>
          <option value="">Selecione o SUS</option>
          {susList.map((s) => (
            <option key={s.id_sus} value={s.id_sus}>{s.nome_gestor} - {s.regiao}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white p-2 rounded mt-2">Salvar</button>
      </form>
    </div>
  );
}
