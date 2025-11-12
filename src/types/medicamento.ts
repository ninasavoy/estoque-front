// src/types/medicamento.ts
/**
 * Tipos relacionados a Medicamento (models.Medicamento)
 */

export interface Medicamento {
  id_medicamento: number;
  nome: string;
  ingestao?: string | null;
  dosagem?: string | null;
  preco: number;
  alto_custo: boolean;
  id_farmaceutica: number;
  // relações opcionais (quando o backend as inclui)
  farmaceutica?: {
    id_farmaceutica: number;
    nome: string;
    cnpj?: string;
    contato?: string;
  } | null;
  lotes?: LoteCompact[] | null;
}

/** forma compacta de lote usada em relacionamentos */
export interface LoteCompact {
  id_lote: number;
  codigo_lote: string;
  data_fabricacao: string; // ISO
  data_vencimento: string; // ISO
  quantidade: number;
}

/** payload para criação/edição de medicamento */
export interface MedicamentoPayload {
  nome: string;
  ingestao?: string | null;
  dosagem?: string | null;
  preco: number;
  alto_custo: boolean;
  // id_farmaceutica é atribuído automaticamente para farmacêuticas autenticadas
  id_farmaceutica?: number;
}
