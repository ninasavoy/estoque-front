"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../api/api";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: form.email,
          senha: form.senha,
        });

        localStorage.setItem("token", res.data.access_token);
        alert("Login realizado com sucesso!");
        router.push("/cadastro-final");
      } else {
        await api.post("/user/register", {
          nome: form.nome,
          email: form.email,
          senha_hash: form.senha,
          tipo: form.tipo,
        });
        alert("Usuário registrado! Faça login para continuar.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Erro ao autenticar. Verifique os dados.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Entrar" : "Criar conta"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <>
              <Input
                placeholder="Nome"
                value={form.nome}
                onChange={(e: { target: { value: any; }; }) => setForm({ ...form, nome: e.target.value })}
              />
              <select
                className="border p-2 rounded"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="">Selecione o tipo</option>
                <option value="farmaceutica">Farmacêutica</option>
                <option value="distribuidor">Distribuidor</option>
                <option value="sus">SUS</option>
                <option value="ubs">UBS</option>
                <option value="paciente">Paciente</option>
              </select>
            </>
          )}

          <Input
            placeholder="E-mail"
            type="email"
            value={form.email}
            onChange={(e: { target: { value: any; }; }) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Senha"
            type="password"
            value={form.senha}
            onChange={(e: { target: { value: any; }; }) => setForm({ ...form, senha: e.target.value })}
          />
          <Button text={isLogin ? "Entrar" : "Cadastrar"} />
        </form>
        <p className="text-center mt-4 text-sm text-gray-500">
          {isLogin ? "Ainda não tem conta?" : "Já possui uma conta?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </span>
        </p>
      </div>
    </div>
  );
}
