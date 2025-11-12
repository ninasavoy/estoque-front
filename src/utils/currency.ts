// src/utils/currency.ts
/**
 * Helpers para formatação de valores monetários em BRL
 */

export function formatBRL(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "R$ 0,00";
  const num = typeof value === "string" ? parseFloat(value.replace(",", ".")) : Number(value || 0);
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Converte string com vírgula para número
 */
export function parseBRL(value: string): number {
  if (!value) return 0;
  const normalized = value.replace(/[^\d,-]/g, "").replace(",", ".");
  return parseFloat(normalized) || 0;
}
