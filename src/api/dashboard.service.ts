// src/api/dashboard.service.ts
import api from "./client";

export type FarmaceuticaOverview = {
  medicamentos: {
    total: number;
    lotes_total: number;
    lotes_vencidos: number;
    lotes_proximos_vencimento: number;
  };
  rastreamento: {
    em_distribuidor: number;
    em_sus: number;
    em_ubs: number;
    chegou_paciente: number;
    taxa_entrega: number;
  };
  "feedbacks e conteúdos": {
    total: number;
    conteudo_educacional: number;
  };
};

export type DistribuidorLogistica = {
  entregas: {
    pendentes: number;
    concluidas: number;
    tempo_medio_dias: number;
  };
  pendentes_detalhes: Array<Record<string, any>>;
};

export type SUSGerencial = {
  estoque: {
    recebidos: number;
    distribuidos_ubs: number;
    em_estoque: number;
  };
  alertas: {
    lotes_vencimento_proximo: number;
    necessita_remanejamento: number;
  };
  lotes_atencao: Array<Record<string, any>>;
};

export type UBSEstoque = {
  estoque: {
    total_recebido: number;
    distribuido_pacientes: number;
    em_estoque: number;
  };
  distribuicoes_recentes: Array<Record<string, any>>;
};

export default {
  async farmaceuticaOverview(): Promise<FarmaceuticaOverview> {
    const res = await api.get("/dashboard/farmaceutica/overview");
    return res.data;
  },

  async distribuidorLogistica(): Promise<DistribuidorLogistica> {
    const res = await api.get("/dashboard/distribuidor/logistica");
    return res.data;
  },

  async susGerencial(): Promise<SUSGerencial> {
    const res = await api.get("/dashboard/sus/gerencial");
    return res.data;
  },

  async ubsEstoque(): Promise<UBSEstoque> {
    const res = await api.get("/dashboard/ubs/estoque");
    return res.data;
  }
};
