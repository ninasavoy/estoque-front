// src/components/ui/Input.tsx
import React from "react";

type InputProps = {
  label?: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  error?: string | null;
  required?: boolean;
  className?: string;
  textarea?: boolean;
  rows?: number;
};

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  error,
  required = false,
  className,
  textarea = false,
  rows = 3,
}: InputProps) {
  return (
    <div style={{ marginBottom: 12 }} className={className}>
      {label && (
        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
          {label} {required ? <span style={{ color: "crimson" }}>*</span> : null}
        </label>
      )}

      {textarea ? (
        <textarea
          name={name}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: error ? "1px solid #dc2626" : "1px solid #ddd",
            minHeight: rows * 24,
            resize: "vertical",
          }}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: error ? "1px solid #dc2626" : "1px solid #ddd",
          }}
        />
      )}

      {error && <div style={{ color: "#dc2626", marginTop: 6, fontSize: 13 }}>{error}</div>}
    </div>
  );
}
