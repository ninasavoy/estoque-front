"use client"

import { useRouter } from "next/navigation"
import { Activity, Shield, Users, TrendingUp } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border/40 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold text-foreground">MediTrack</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </a>
            <button
              onClick={() => router.push("/login")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Entrar
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Sistema Seguro e Confiável</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Sistema de Gestão de <span className="text-primary">Medicamentos</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
            Plataforma completa para farmacêuticas, distribuidores, SUS, UBS, pacientes e administradores. Gerencie
            medicamentos, rastreie lotes e garanta a segurança da cadeia de suprimentos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/signup")}
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
            >
              Criar Conta
            </button>
            <button
              onClick={() => router.push("/login")}
              className="w-full sm:w-auto px-8 py-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-lg transition-colors"
            >
              Acessar Sistema
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">Recursos Principais</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Uma solução completa para todos os participantes da cadeia de medicamentos
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Rastreamento em Tempo Real</h3>
              <p className="text-muted-foreground">
                Acompanhe medicamentos e lotes em toda a cadeia de distribuição com transparência total.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Perfis</h3>
              <p className="text-muted-foreground">
                Suporte para 6 tipos de usuários: farmacêuticas, distribuidores, SUS, UBS, pacientes e administradores.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Dashboard Inteligente</h3>
              <p className="text-muted-foreground">
                Visualize dados, métricas e insights personalizados para cada tipo de usuário.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Pronto para Começar?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Crie sua conta agora e faça parte do futuro da gestão de medicamentos.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors shadow-lg shadow-primary/25"
          >
            Criar Conta Gratuitamente
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 MediTrack. Sistema de Gestão de Medicamentos.</p>
        </div>
      </footer>
    </main>
  )
}
