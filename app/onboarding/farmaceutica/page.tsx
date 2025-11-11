"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function FarmaceuticaOnboardingPage() {
  const [nome, setNome] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [contato, setContato] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")

    if (!token || !userStr) {
      window.location.href = "/login"
      return
    }

    const user = JSON.parse(userStr)
    if (user.tipo !== "farmaceutica") {
      window.location.href = "/dashboard"
      return
    }

    if (user.ativo) {
      window.location.href = "/dashboard"
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/farmaceuticas/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, cnpj, contato }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Erro ao completar perfil")
      }

      // Update user status in localStorage
      const userStr = localStorage.getItem("user")
      if (userStr) {
        const user = JSON.parse(userStr)
        user.ativo = true
        localStorage.setItem("user", JSON.stringify(user))
      }

      toast({
        title: "Perfil completado!",
        description: "Sua farmacêutica foi cadastrada com sucesso",
      })

      // Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (error) {
      toast({
        title: "Erro ao completar perfil",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Complete seu Perfil</CardTitle>
          <CardDescription>Cadastre sua farmacêutica para ativar sua conta e começar a usar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Farmacêutica</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Ex: Farmácia Central Ltda"
                  value={nome}
                  onChange={(e: { target: { value: React.SetStateAction<string> } }) => setNome(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={cnpj}
                  onChange={(e: { target: { value: React.SetStateAction<string> } }) => setCnpj(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contato">Contato</Label>
                <Input
                  id="contato"
                  type="text"
                  placeholder="(00) 00000-0000"
                  value={contato}
                  onChange={(e: { target: { value: React.SetStateAction<string> } }) => setContato(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Concluir Cadastro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
