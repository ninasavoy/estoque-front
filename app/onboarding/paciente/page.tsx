"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UBSOption {
  id_ubs: number
  nome: string
  endereco: string
}

export default function PacienteOnboardingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingUBS, setLoadingUBS] = useState(true)
  const [ubsList, setUbsList] = useState<UBSOption[]>([])
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    contato: "",
    id_ubs: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")

    if (!token || !userStr) {
      window.location.href = "/login"
      return
    }

    const user = JSON.parse(userStr)
    if (user.tipo !== "paciente") {
      window.location.href = "/dashboard"
      return
    }

    if (user.ativo) {
      window.location.href = "/dashboard"
    }

    // Load UBS list
    loadUBSList(token)
  }, [])

  const loadUBSList = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/ubs/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUbsList(data)
      }
    } catch (error) {
      console.error("[v0] Error loading UBS list:", error)
    } finally {
      setLoadingUBS(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      const response = await fetch(`${apiUrl}/pacientes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          id_ubs: Number.parseInt(formData.id_ubs),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Erro ao criar perfil de paciente")
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
        description: "Bem-vindo ao sistema",
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
          <CardTitle className="text-2xl">Complete seu Perfil - Paciente</CardTitle>
          <CardDescription>Preencha suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e: { target: { value: any } }) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input
                  id="sobrenome"
                  type="text"
                  placeholder="Seu sobrenome"
                  value={formData.sobrenome}
                  onChange={(e: { target: { value: any } }) => setFormData({ ...formData, sobrenome: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e: { target: { value: any } }) => setFormData({ ...formData, cpf: e.target.value })}
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
              <Label htmlFor="id_ubs">UBS de Referência</Label>
              <Select
                value={formData.id_ubs}
                onValueChange={(value: any) => setFormData({ ...formData, id_ubs: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingUBS ? "Carregando..." : "Selecione a UBS"} />
                </SelectTrigger>
                <SelectContent>
                  {ubsList.map((ubs) => (
                    <SelectItem key={ubs.id_ubs} value={ubs.id_ubs.toString()}>
                      {ubs.nome} - {ubs.endereco}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading || loadingUBS}>
              {isLoading ? "Criando perfil..." : "Concluir Cadastro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
