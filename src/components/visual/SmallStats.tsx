import React from "react";

/**
 * SmallStats - cartão pequeno com estatística, valor e tendência.
 *
 * Compatibilidade:
 * - aceita props antigas: { label, value, delta, help, size }
 * - aceita props usadas nas páginas: { title, value, variant }
 *
 * Variant: 'default' | 'danger' | 'success' — altera a cor do valor / destaque.
 */

type Props = {
  // old name
  label?: string;
  // new name used in pages
  title?: string;
  value: string | number;
  delta?: number | null;
  help?: string;
  size?: "sm" | "md";
  variant?: "default" | "danger" | "success";
  // extra: allow children or custom content if needed
  children?: React.ReactNode;
};

export default function SmallStats({
  label,
  title,
  value,
  delta = null,
  help,
  size = "md",
  variant = "default",
  children,
}: Props) {
  const mainLabel = title ?? label ?? "";
  const isPositive = (delta ?? 0) >= 0;

  const containerStyle: React.CSSProperties = {
    background: "white",
    padding: size === "sm" ? 10 : 14,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(12,15,20,0.04)",
    border: "1px solid #f3f4f6",
    minWidth: 160,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: size === "sm" ? 18 : 22,
    fontWeight: 800,
    // color by variant
    color: variant === "danger" ? "#9b1c1c" : variant === "success" ? "#065f46" : "#111827",
  };

  const deltaStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: isPositive ? "#065f46" : "#991b1b",
    fontWeight: 700,
    fontSize: 13,
  };

  return (
    <div style={containerStyle} role="status" aria-label={`stat-${mainLabel}`}>
      <div style={{ fontSize: size === "sm" ? 12 : 13, color: "#666" }}>{mainLabel}</div>

      <div style={valueStyle}>{value}</div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
        {typeof delta === "number" && (
          <div style={deltaStyle}>
            {isPositive ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
          </div>
        )}

        {help && <div style={{ fontSize: 12, color: "#888" }}>{help}</div>}
        {children}
      </div>
    </div>
  );
}
