// src/components/ui/Card.tsx
import React from "react";

type Props = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
};

export default function Card({ title, children, footer, className, style }: Props) {
  return (
    <div
      className={className}
      style={{
        background: "white",
        borderRadius: 10,
        boxShadow: "0 4px 18px rgba(12,15,20,0.04)",
        padding: 16,
        border: "1px solid #f0f0f0",
        ...style
      }}
    >
      {title && <div style={{ marginBottom: 12, fontWeight: 700 }}>{title}</div>}
      <div>{children}</div>
      {footer && <div style={{ marginTop: 14, borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>{footer}</div>}
    </div>
  );
}
