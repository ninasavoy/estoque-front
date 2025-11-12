// src/api/movimentacoes.service.ts
import api from "./client";

/**
 * Movimentações são separadas em três routers:
 *  - Distribuidor -> SUS: /distribuidores-sus
 *  - SUS -> UBS: /sus-ubs
 *  - UBS -> Paciente: /ubs-pacientes
 *
 * Cada rota suporta CRUD e endpoint POST /{id}/confirmar
 */

export type DPS = {
  id_dps?: number;
  id_distribuidor?: number;
  id_sus: number;
  id_lote: number;
  quantidade: number;
  data_envio?: string;
  data_recebimento?: string | null;
  status?: string;
};

export type SPU = {
  id_spu?: number;
  id_sus?: number;
  id_ubs: number;
  id_lote: number;
  data_envio?: string;
  data_recebimento?: string | null;
  status?: string;
};

export type UPP = {
  id_upp?: number;
  id_ubs?: number;
  id_paciente: number;
  id_lote: number;
  data_envio?: string;
  data_recebimento?: string | null;
  status?: string;
};

export default {
  // Distributor -> SUS (DPS)
  async createDPS(payload: Omit<DPS, "id_dps" | "data_envio" | "status">) {
    const res = await api.post("/distribuidores-sus/", payload);
    return res.data as DPS;
  },

  async listDPS() {
    const res = await api.get("/distribuidores-sus/");
    return res.data as DPS[];
  },

  async getDPS(id: number) {
    const res = await api.get(`/distribuidores-sus/${id}`);
    return res.data as DPS;
  },

  async updateDPS(id: number, payload: Partial<DPS>) {
    const res = await api.put(`/distribuidores-sus/${id}`, payload);
    return res.data as DPS;
  },

  async deleteDPS(id: number) {
    const res = await api.delete(`/distribuidores-sus/${id}`);
    return res.data;
  },

  async confirmarDPS(id: number) {
    const res = await api.post(`/distribuidores-sus/${id}/confirmar`);
    return res.data;
  },

  // SUS -> UBS (SPU)
  async createSPU(payload: Omit<SPU, "id_spu" | "data_envio" | "status">) {
    const res = await api.post("/sus-ubs/", payload);
    return res.data as SPU;
  },

  async listSPU() {
    const res = await api.get("/sus-ubs/");
    return res.data as SPU[];
  },

  async getSPU(id: number) {
    const res = await api.get(`/sus-ubs/${id}`);
    return res.data as SPU;
  },

  async updateSPU(id: number, payload: Partial<SPU>) {
    const res = await api.put(`/sus-ubs/${id}`, payload);
    return res.data as SPU;
  },

  async deleteSPU(id: number) {
    const res = await api.delete(`/sus-ubs/${id}`);
    return res.data;
  },

  async confirmarSPU(id: number) {
    const res = await api.post(`/sus-ubs/${id}/confirmar`);
    return res.data;
  },

  // UBS -> Paciente (UPP)
  async createUPP(payload: Omit<UPP, "id_upp" | "data_envio" | "status">) {
    const res = await api.post("/ubs-pacientes/", payload);
    return res.data as UPP;
  },

  async listUPP() {
    const res = await api.get("/ubs-pacientes/");
    return res.data as UPP[];
  },

  async getUPP(id: number) {
    const res = await api.get(`/ubs-pacientes/${id}`);
    return res.data as UPP;
  },

  async updateUPP(id: number, payload: Partial<UPP>) {
    const res = await api.put(`/ubs-pacientes/${id}`, payload);
    return res.data as UPP;
  },

  async deleteUPP(id: number) {
    const res = await api.delete(`/ubs-pacientes/${id}`);
    return res.data;
  },

  async confirmarUPP(id: number) {
    const res = await api.post(`/ubs-pacientes/${id}/confirmar`);
    return res.data;
  }
};
