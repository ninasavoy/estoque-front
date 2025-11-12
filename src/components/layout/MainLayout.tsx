// src/components/layout/MainLayout.tsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

/**
 * MainLayout organiza Sidebar + Topbar + conteúdo + Footer.
 * Use-o como wrapper das páginas protegidas.
 */

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f8fb" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />

        <main style={{ flex: 1, padding: 20, boxSizing: "border-box" }}>
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
