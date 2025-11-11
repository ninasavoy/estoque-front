"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SUSOption {
  id_sus: number
  regiao: string
  nome_gestor: string
}

export default function UbsOnboardingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingSUS, setLoadingSUS] = useState(true)
  const [susList, setSusList] = useState<SUSOption[]>([])
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nome: "",
    contato: "",
    endereco: "",
    id_sus: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")

    if (!token || !userStr) {
      window.location.href = "/login"
      return
    }

    const user = JSON.parse(userStr)
    if (user.tipo !== "ubs") {
      window.location.href = "/dashboard"
      return
    }

    if (user.ativo) {
      window.location.href = "/dashboard"
    }

    // Load SUS list
    loadSUSList(token)
  }, [])

  const loadSUSList = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/sus/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setSusList(data)
      }
    } catch (error) {
      console.error("[v0] Error loading SUS list:", error)
    } finally {
      setLoadingSUS(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      const response = await fetch(`${apiUrl}/ubs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          id_sus: Number.parseInt(formData.id_sus),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Erro ao criar perfil UBS")
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
        description: "Bem-vindo ao sistema UBS",
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
          <CardTitle className="text-2xl">Complete seu Perfil - UBS</CardTitle>
          <CardDescription>Preencha as informações da Unidade Básica de Saúde</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da UBS</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite o nome da UBS"
                value={formData.nome}
                onChange={(e: { target: { value: any } }) => setFormData({ ...formData, nome: e.target.value })}
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

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                type="text"
                placeholder="Rua, número, bairro, cidade"
                value={formData.endereco}
                onChange={(e: { target: { value: any } }) => setFormData({ ...formData, endereco: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="id_sus">Sistema de Saúde (SUS)</Label>
              <Select
                value={formData.id_sus}
                onValueChange={(value: any) => setFormData({ ...formData, id_sus: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingSUS ? "Carregando..." : "Selecione o SUS"} />
                </SelectTrigger>
                <SelectContent>
                  {susList.map((sus) => (
                    <SelectItem key={sus.id_sus} value={sus.id_sus.toString()}>
                      {sus.regiao} - {sus.nome_gestor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading || loadingSUS}>
              {isLoading ? "Criando perfil..." : "Concluir Cadastro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
