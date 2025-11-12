// src/pages/Home.tsx
import React from "react";

/**
 * Página inicial — apenas uma introdução simples com o logo e mensagem da TCS.
 */
export default function Home() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <div
        className="card"
        style={{
          padding: 40,
          textAlign: "center",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
          maxWidth: 600,
        }}
      >
        {/* Logo da TCS (imagem em branco no fundo branco → colocamos fundo temporário sutil) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#0b74de",
              borderRadius: 8,
              padding: "12px 20px",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo TCS"
              style={{
                width: 160,
                height: "auto",
                objectFit: "contain",
                filter: "brightness(0) invert(1)", // mantém o logo branco visível
              }}
            />
          </div>
        </div>

        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            color: "#111827",
            marginBottom: 10,
          }}
        >
          Bem-vindo ao App de Controle de Medicamentos da TCS
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            lineHeight: 1.6,
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          Uma plataforma desenvolvida para facilitar a rastreabilidade,
          gestão e transparência em toda a cadeia farmacêutica —
          conectando farmacêuticas, distribuidores, SUS, UBS e pacientes.
        </p>
      </div>
    </div>
  );
}
