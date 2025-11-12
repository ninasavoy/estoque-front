// src/utils/date.ts
/**
 * Helpers para manipulação/formatação de datas.
 * Locale padrão: pt-BR
 */

export function formatDateISO(date?: string | Date | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("pt-BR");
}

/**
 * Formata data e hora (pt-BR)
 */
export function formatDateTime(date?: string | Date | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("pt-BR");
}

/**
 * Retorna a quantidade de dias entre hoje e a data fornecida.
 * Se a data já passou, retorna número negativo.
 */
export function daysUntil(date: string | Date): number {
  const target = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  // normaliza horas (compara apenas dias)
  const t = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const now = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.floor((t - now) / (1000 * 60 * 60 * 24));
  return diff;
}

/**
 * Verifica se a data já venceu (data < agora)
 */
export function isExpired(date: string | Date): boolean {
  const target = typeof date === "string" ? new Date(date) : date;
  return target.getTime() < Date.now();
}
