"use client"

import { useRouter } from "next/navigation"
import Button from "@/components/Button"

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">
        Sistema de Gestão de Medicamentos 💊
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Bem-vindo! Aqui você pode gerenciar o fluxo de medicamentos entre Farmacêuticas, Distribuidores, SUS, UBS e Pacientes.
      </p>

      <div className="flex gap-4">
        <Button onClick={() => router.push("/login")} className="bg-blue-500 hover:bg-blue-600 text-white">
          Entrar
        </Button>

        <Button onClick={() => router.push("/register")} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
          Criar conta
        </Button>
      </div>
    </main>
  )
}
