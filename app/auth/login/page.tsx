"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../api/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/token", { username: email, password: senha });
      localStorage.setItem("access_token", res.data.access_token);
      router.push("/cadastro-final");
    } catch {
      alert("Login inválido");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
        <input className="border p-2 rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input className="border p-2 rounded" type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}/>
        <button className="bg-blue-600 text-white p-2 rounded mt-2">Entrar</button>
      </form>
    </div>
  );
}
