// src/api/conteudo.service.ts
import api from "./client";

export type Conteudo = {
  id_conteudo?: number;
  id_medicamento: number;
  titulo: string;
  tipo: "doenca" | "medicamento" | "uso_correto" | "efeitos_colaterais";
  conteudo: string;
  data_criacao?: string;
};

export default {
  async list(): Promise<Conteudo[]> {
    const res = await api.get("/conteudo/");
    return res.data;
  },

  async get(id: number): Promise<Conteudo> {
    const res = await api.get(`/conteudo/${id}`);
    return res.data;
  },

  async create(payload: Omit<Conteudo, "id_conteudo" | "data_criacao">) {
    // backend expects fields: id_medicamento, titulo, tipo, conteudo
    const res = await api.post("/conteudo/", payload);
    return res.data;
  },

  async update(id: number, payload: Partial<Conteudo>) {
    const res = await api.put(`/conteudo/${id}`, payload);
    return res.data;
  },

  async remove(id: number) {
    const res = await api.delete(`/conteudo/${id}`);
    return res.data;
  }
};
