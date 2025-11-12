// src/api/medicamentos.service.ts
import api from "./client";

export type Medicamento = {
  id_medicamento?: number;
  nome: string;
  ingestao?: string | null;
  dosagem?: string | null;
  preco: number;
  alto_custo: boolean;
  id_farmaceutica?: number;
};

export default {
  async list(): Promise<Medicamento[]> {
    const res = await api.get("/medicamentos");
    return res.data;
  },

  async get(id: number): Promise<Medicamento> {
    const res = await api.get(`/medicamentos/${id}`);
    return res.data;
  },

  async create(payload: Omit<Medicamento, "id_medicamento">): Promise<Medicamento> {
    const res = await api.post("/medicamentos", payload);
    return res.data;
  },

  async update(id: number, payload: Partial<Medicamento>): Promise<Medicamento> {
    const res = await api.put(`/medicamentos/${id}`, payload);
    return res.data;
  },

  async remove(id: number): Promise<{ message: string }> {
    const res = await api.delete(`/medicamentos/${id}`);
    return res.data;
  },

  async listByFarmaceutica(farmaceuticaId: number) {
    const res = await api.get(`/medicamentos/farmaceutica/${farmaceuticaId}`);
    return res.data as Medicamento[];
  },

  async listAltoCusto() {
    const res = await api.get("/medicamentos/alto_custo/");
    return res.data as Medicamento[];
  }
};
