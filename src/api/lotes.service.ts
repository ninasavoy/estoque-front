// src/api/lotes.service.ts
import api from "./client";

export type Lote = {
  id_lote?: number;
  codigo_lote: string;
  data_fabricacao: string; // ISO string
  data_vencimento: string; // ISO string
  quantidade: number;
  id_medicamento: number;
};

export default {
  async list(): Promise<Lote[]> {
    const res = await api.get("/lotes");
    return res.data;
  },

  async listVencidos(): Promise<Lote[]> {
    const res = await api.get("/lotes/vencidos/");
    return res.data;
  },

  async get(id: number): Promise<Lote> {
    const res = await api.get(`/lotes/${id}`);
    return res.data;
  },

  async create(payload: Omit<Lote, "id_lote">): Promise<Lote> {
    const res = await api.post("/lotes", payload);
    return res.data;
  },

  async update(id: number, payload: Partial<Lote>): Promise<Lote> {
    const res = await api.put(`/lotes/${id}`, payload);
    return res.data;
  },

  async remove(id: number): Promise<{ message: string }> {
    const res = await api.delete(`/lotes/${id}`);
    return res.data;
  }
};
