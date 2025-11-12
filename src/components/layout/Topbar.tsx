// src/components/layout/Topbar.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * Topbar com nome do usuário, botão logout e espaço para ações rápidas.
 *
 * O botão de menu dispara um evento customizado 'toggle-mobile-sidebar'.
 * Também escuta 'sidebar-state' para atualizar o ícone conforme o estado.
 */

export default function Topbar() {
  const { user, logout } = useAuth();
  // local state para refletir se sidebar está aberta (usado apenas para ícone)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    function onSidebarState(e: Event) {
      try {
        // evento customizado com detail: { open: boolean }
        const ce = e as CustomEvent<{ open: boolean }>;
        if (ce && typeof ce.detail?.open === "boolean") {
          setSidebarOpen(ce.detail.open);
        }
      } catch {
        // ignore
      }
    }

    window.addEventListener("sidebar-state", onSidebarState as EventListener);
    return () => {
      window.removeEventListener("sidebar-state", onSidebarState as EventListener);
    };
  }, []);

  function toggleSidebar() {
    // dispara evento para alternar a sidebar
    const evt = new CustomEvent("toggle-mobile-sidebar");
    window.dispatchEvent(evt);
  }

  return (
    <header
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #eee",
        background: "white",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          aria-label="menu"
          onClick={toggleSidebar}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 8,
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          {/* Ícone muda conforme o estado recebido da sidebar */}
          {sidebarOpen ? "✕" : "☰"}
        </button>

        <Link to="/" style={{ textDecoration: "none", color: "#0b74de", fontWeight: 700 }}>
          TCS Stock App
        </Link>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user ? (
          <>
            <div style={{ textAlign: "right", fontSize: 14 }}>
              <div style={{ fontWeight: 600 }}>{user.nome}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{user.tipo}</div>
            </div>

            <button
              onClick={() => logout()}
              style={{
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none", color: "#0b74de" }}>
              Entrar
            </Link>
            <Link to="/register" style={{ textDecoration: "none", color: "#0b74de" }}>
              Cadastrar
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
