"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const USER_TYPES = [
  { value: "farmaceutica", label: "Farmacêutica" },
  { value: "distribuidor", label: "Distribuidor" },
  { value: "sus", label: "SUS" },
  { value: "ubs", label: "UBS" },
  { value: "paciente", label: "Paciente" },
  { value: "admin", label: "Administrador" },
]

export function SignupForm() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const [tipo, setTipo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (senha !== confirmSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      })
      return
    }

    if (!tipo) {
      toast({
        title: "Erro",
        description: "Selecione o tipo de usuário",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha, tipo }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Erro ao criar conta")
      }

      // Automatically log in and redirect to profile completion
      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })

      const loginData = await loginResponse.json()

      if (loginResponse.ok) {
        localStorage.setItem("token", loginData.access_token)
        localStorage.setItem("user", JSON.stringify(loginData.user))
        localStorage.setItem("permissions", JSON.stringify(loginData.permissions))

        toast({
          title: "Conta criada com sucesso!",
          description: "Complete seu perfil para começar",
        })

        // Redirect to onboarding based on user type
        window.location.href = `/onboarding/${tipo}`
      } else {
        toast({
          title: "Conta criada!",
          description: "Faça login para continuar",
        })
        window.location.href = "/login"
      }
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            type="text"
            placeholder="João Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            disabled={isLoading}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de usuário</Label>
          <Select value={tipo} onValueChange={setTipo} disabled={isLoading}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {USER_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            disabled={isLoading}
            className="h-11"
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmSenha">Confirmar senha</Label>
          <Input
            id="confirmSenha"
            type="password"
            placeholder="••••••••"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
            disabled={isLoading}
            className="h-11"
            minLength={6}
          />
        </div>
      </div>

      <Button type="submit" className="w-full h-11" disabled={isLoading}>
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  )
}
