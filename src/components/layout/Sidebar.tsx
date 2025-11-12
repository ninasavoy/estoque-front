// src/components/layout/Sidebar.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * Sidebar simples que exibe links conforme tipo de usuário.
 *
 * Agora escuta o evento 'toggle-mobile-sidebar' para abrir/fechar.
 * Emite 'sidebar-state' sempre que muda (detail: { open: boolean }).
 */

const baseLinks = [{ to: "/", label: "Home" }];

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  // estado local de visibilidade. Em desktop pode ficar true por padrão.
  const [open, setOpen] = useState<boolean>(true);

  // construir lista de links conforme tipo
  const links = React.useMemo(() => {
    if (!user) return baseLinks;

    const tipo = user.tipo;
    const l = [...baseLinks];

    if (tipo === "farmaceutica") {
      l.push({ to: "/dashboard/farmaceutica", label: "Dashboard Farmacêutica" });
      l.push({ to: "/medicamentos", label: "Medicamentos" });
      l.push({ to: "/lotes", label: "Lotes" });
      l.push({ to: "/rastreamento", label: "Rastreamento" });
    } else if (tipo === "distribuidor") {
      l.push({ to: "/dashboard/distribuidor", label: "Dashboard Distribuidor" });
      l.push({ to: "/movimentacoes/dps", label: "Saídas (Distribuidor → SUS)" });
    } else if (tipo === "sus") {
      l.push({ to: "/dashboard/sus", label: "Dashboard SUS" });
      l.push({ to: "/ubs", label: "UBSs" });
    } else if (tipo === "ubs") {
      l.push({ to: "/dashboard/ubs", label: "Dashboard UBS" });
      l.push({ to: "/ubs/estoque", label: "Estoque UBS" });
    } else if (tipo === "paciente") {
      l.push({ to: "/minha-conta", label: "Minha conta" });
      l.push({ to: "/meus-medicamentos", label: "Meus medicamentos" });
    } else if (tipo === "admin") {
      l.push({ to: "/admin/users", label: "Usuários" });
      l.push({ to: "/admin/dashboard", label: "Dashboard Admin" });
    }

    return l;
  }, [user]);

  // listener para alternar visibilidade
  useEffect(() => {
    function onToggle() {
      setOpen((prev) => {
        const next = !prev;
        // emitir evento com novo estado
        const evt = new CustomEvent("sidebar-state", { detail: { open: next } });
        window.dispatchEvent(evt);
        return next;
      });
    }

    window.addEventListener("toggle-mobile-sidebar", onToggle as EventListener);
    return () => {
      window.removeEventListener("toggle-mobile-sidebar", onToggle as EventListener);
    };
  }, []);

  // sempre emitir estado atual ao montar (Topbar pode sincronizar)
  useEffect(() => {
    const evt = new CustomEvent("sidebar-state", { detail: { open } });
    window.dispatchEvent(evt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // estilos adaptativos: quando fechado, encolhe/oculta
  const containerStyle: React.CSSProperties = open
    ? {
        width: 220,
        borderRight: "1px solid #eee",
        padding: 16,
        minHeight: "100vh",
        boxSizing: "border-box",
        background: "#fafafa",
        transition: "width 180ms ease, transform 180ms ease",
      }
    : {
        width: 0,
        borderRight: "none",
        padding: 0,
        minHeight: "0",
        boxSizing: "border-box",
        overflow: "hidden",
        background: "#fafafa",
        transition: "width 180ms ease, transform 180ms ease",
      };

  return (
    <aside style={containerStyle} aria-hidden={!open}>
      {/* Renderizamos o conteúdo normalmente; quando fechado largura 0 fará o layout colapsar */}
      <div style={{ marginBottom: 20, display: open ? "block" : "none" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#0b74de", fontWeight: 700, fontSize: 18 }}>
          TCS Stock App
        </Link>
      </div>

      <nav>
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <div key={link.to} style={{ marginBottom: 8, display: open ? "block" : "none" }}>
              <Link
                to={link.to}
                style={{
                  display: "block",
                  padding: "8px 10px",
                  borderRadius: 6,
                  textDecoration: "none",
                  color: active ? "white" : "#333",
                  background: active ? "#0b74de" : "transparent",
                }}
              >
                {link.label}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
