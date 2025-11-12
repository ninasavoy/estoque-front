// src/components/ui/Modal.tsx
import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  closeOnBackdrop?: boolean;
};

export default function Modal({ open, onClose, title, children, size = "md", closeOnBackdrop = true }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizes: Record<string, React.CSSProperties> = {
    sm: { width: 420 },
    md: { width: 720 },
    lg: { width: "90%", maxWidth: 1080 }
  };

  return (
    <div
      role="dialog"
      aria-modal
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* backdrop */}
      <div
        onClick={() => closeOnBackdrop && onClose()}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)"
        }}
      />

      <div style={{ position: "relative", ...sizes[size], zIndex: 1201 }}>
        <div style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}>
          <div style={{ padding: 14, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700 }}>{title}</div>
            <button
              onClick={onClose}
              aria-label="fechar"
              style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 18 }}
            >
              ✕
            </button>
          </div>

          <div style={{ padding: 16 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
