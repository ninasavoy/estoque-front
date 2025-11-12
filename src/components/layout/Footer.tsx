// src/components/layout/Footer.tsx
import React from "react";

/**
 * Footer simples que fica no final da página.
 */

export default function Footer() {
  return (
    <footer style={{
      padding: 16,
      borderTop: "1px solid #eee",
      background: "#fff",
      textAlign: "center",
      fontSize: 13,
      color: "#666"
    }}>
      <div>Projeto Capstone — Controle de Estoque de Medicamentos</div>
      <div style={{ marginTop: 6 }}>© {new Date().getFullYear()} — Desenvolvido para demonstração</div>
    </footer>
  );
}
