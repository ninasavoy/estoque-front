// src/components/auth/SSOButton.tsx
import React from "react";

/**
 * SSOButton - visual e hook-in para integração SSO.
 * Nota: o backend atual menciona SSO (MS/Google), mas não forneceu endpoints.
 * Esse botão é um placeholder que abre uma URL externa (caso exista) ou chama uma callback.
 */

type Props = {
  provider?: "google" | "microsoft";
  ssoUrl?: string; // se seu backend fornecer URL de SSO, informe aqui
  onStart?: () => void;
};

export default function SSOButton({ provider = "google", ssoUrl, onStart }: Props) {
  const label = provider === "google" ? "Entrar com Google" : "Entrar com Microsoft";

  const handle = () => {
    onStart?.();
    if (ssoUrl) {
      // abre página de SSO (o fluxo volta ao frontend via redirect)
      window.location.href = ssoUrl;
    } else {
      // só demonstração (poderia abrir modal ou instruir o usuário)
      alert("SSO não configurado no backend. Configure VITE_SSO_URL ou passe `ssoUrl` para o componente.");
    }
  };

  return (
    <button
      onClick={handle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #ddd",
        background: "white",
        cursor: "pointer"
      }}
    >
      <img
        alt={provider}
        src={provider === "google" ? "/logo-google.png" : "/logo-microsoft.png"}
        style={{ width: 18, height: 18 }}
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
      />
      <span style={{ fontSize: 14 }}>{label}</span>
    </button>
  );
}
