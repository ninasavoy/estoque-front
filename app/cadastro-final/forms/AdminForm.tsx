"use client";
import { useRouter } from "next/navigation";

export default function AdminForm() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Administrador</h1>
      <p className="text-gray-700 mb-6">
        Administradores não precisam finalizar o cadastro.
      </p>
      <button
        className="bg-blue-600 text-white p-2 rounded"
        onClick={() => router.push("/dashboard")}
      >
        Ir para o painel
      </button>
    </div>
  );
}
