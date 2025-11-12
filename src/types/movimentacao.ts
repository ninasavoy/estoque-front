// src/types/movimentacao.ts
/**
 * Tipos para movimentações do sistema:
 * - DistribuidorParaSUS (DPS)
 * - SUSParaUBS (SPU)
 * - UBSParaPaciente (UPP)
 *
 * Cada tabela tem um conjunto parecido de campos (id, ids de origem/destino,
 * id_lote, quantidade, datas e status).
 */

/** status comum usado nas movimentações */
export type MovStatus = "em transito" | "em_transito" | "recebido" | "entregue" | string;

/** DPS - Distribuidor -> SUS */
export interface DistribuidorParaSUS {
  id_dps: number;
  id_distribuidor: number;
  id_sus: number;
  id_lote: number;
  quantidade: number;
  data_envio: string; // ISO
  data_recebimento?: string | null;
  status: MovStatus;
}

/** SPU - SUS -> UBS */
export interface SUSParaUBS {
  id_spu: number;
  id_sus: number;
  id_ubs: number;
  id_lote: number;
  quantidade?: number;
  data_envio: string; // ISO
  data_recebimento?: string | null;
  status: MovStatus;
}

/** UPP - UBS -> PACIENTE */
export interface UBSParaPaciente {
  id_upp: number;
  id_ubs: number;
  id_paciente: number;
  id_lote: number;
  quantidade?: number;
  data_envio: string; // ISO
  data_recebimento?: string | null;
  status: MovStatus;
}

/** Payloads para criação */
export type CreateDpsPayload = {
  id_sus: number;
  id_lote: number;
  quantidade: number;
  // id_distribuidor será atribuído no backend para o distribuidor autenticado
};

export type CreateSpuPayload = {
  id_ubs: number;
  id_lote: number;
  quantidade: number;
  // id_sus será atribuído no backend para o SUS autenticado
};

export type CreateUppPayload = {
  id_paciente: number;
  id_lote: number;
  quantidade: number;
  // id_ubs será atribuído no backend para a UBS autenticada
};
