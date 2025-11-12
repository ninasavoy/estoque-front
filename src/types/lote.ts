// src/types/lote.ts
/**
 * Tipos relacionados a Lote (models.Lote)
 */

export interface Lote {
  id_lote: number;
  codigo_lote: string;
  data_fabricacao: string; // ISO date string
  data_vencimento: string; // ISO date string
  quantidade: number;
  id_medicamento: number;

  // relações opcionais
  medicamento?: {
    id_medicamento: number;
    nome: string;
    id_farmaceutica: number;
  } | null;
}

/** Payload esperado para criar/atualizar lote */
export interface LotePayload {
  codigo_lote: string;
  data_fabricacao: string | Date;
  data_vencimento: string | Date;
  quantidade: number;
  id_medicamento: number;
}
