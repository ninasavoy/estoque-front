// src/components/ui/Table.tsx
import React from "react";

/**
 * Table genérica simples.
 *
 * columns: array de { key, label, render? }.
 * data: array de objetos
 *
 * Exemplo:
 * columns = [{ key: "nome", label: "Nome" }, { key: "preco", label: "Preço", render: (row)=> format }]
 */

export type Column<T = any> = {
  key: string;
  label: string;
  width?: string | number;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: string | ((row: T, idx: number) => string | number);
  emptyPlaceholder?: React.ReactNode;
  className?: string;
};

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  rowKey = (r: T, i: number) => (r.id ?? r.id_medicamento ?? i),
  emptyPlaceholder = "Nenhum registro encontrado",
  className,
}: Props<T>) {
  return (
    <div style={{ overflowX: "auto" }} className={className}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  textAlign: col.align ?? "left",
                  padding: "10px 12px",
                  borderBottom: "1px solid #eee",
                  fontSize: 13,
                  width: col.width,
                  background: "#fafafa"
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ padding: 20, textAlign: "center", color: "#666" }}>
                {emptyPlaceholder}
              </td>
            </tr>
          )}

          {data.map((row, idx) => {
            const key = typeof rowKey === "function" ? rowKey(row, idx) : (row as any)[rowKey] ?? idx;
            return (
              <tr key={String(key)} style={{ borderBottom: "1px solid #f3f4f6" }}>
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: "10px 12px", verticalAlign: "middle", textAlign: col.align ?? "left" }}>
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
