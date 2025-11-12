// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "70vh", padding: 20 }}>
      <div className="card" style={{ textAlign: "center", width: 560, maxWidth: "95%" }}>
        <h1>404</h1>
        <h3>Página não encontrada</h3>
        <p className="text-muted">A URL que você tentou acessar não existe.</p>
        <div style={{ marginTop: 12 }}>
          <Link to="/" className="btn btn-primary">Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
}
