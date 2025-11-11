"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function DistribuidorOnboardingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    contato: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")

    if (!token || !userStr) {
      window.location.href = "/login"
      return
    }

    const user = JSON.parse(userStr)
    if (user.tipo !== "distribuidor") {
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      const response = await fetch(`${apiUrl}/distribuidores/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Erro ao criar perfil de distribuidor")
      }

      const data = await response.json()

      // Update user status in localStorage
      const userStr = localStorage.getItem("user")
      if (userStr) {
        const user = JSON.parse(userStr)
        user.ativo = true
        localStorage.setItem("user", JSON.stringify(user))
      }

      toast({
        title: "Perfil criado com sucesso!",
        description: "Bem-vindo ao sistema de distribuição",
      })

      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
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
          <CardTitle className="text-2xl">Complete seu Perfil - Distribuidor</CardTitle>
          <CardDescription>Preencha as informações da sua empresa distribuidora</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Empresa</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite o nome da empresa"
                value={formData.nome}
                onChange={(e: { target: { value: any } }) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                type="text"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={(e: { target: { value: any } }) => setFormData({ ...formData, cnpj: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contato">Contato</Label>
              <Input
                id="contato"
                type="text"
                placeholder="(00) 00000-0000"
                value={formData.contato}
                onChange={(e: { target: { value: any } }) => setFormData({ ...formData, contato: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "Criando perfil..." : "Concluir Cadastro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
