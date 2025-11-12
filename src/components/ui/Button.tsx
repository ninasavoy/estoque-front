// src/components/ui/Button.tsx
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  title?: string;
};

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { background: "#0b74de", color: "white", border: "none" },
  secondary: { background: "#f3f4f6", color: "#111827", border: "1px solid #e5e7eb" },
  danger: { background: "#dc2626", color: "white", border: "none" },
  ghost: { background: "transparent", color: "#0b74de", border: "1px solid transparent" },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: "6px 10px", fontSize: 13 },
  md: { padding: "8px 14px", fontSize: 15 },
  lg: { padding: "10px 16px", fontSize: 16 },
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  title,
}: ButtonProps) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.7 : 1,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
      title={title}
    >
      {children}
    </button>
  );
}
