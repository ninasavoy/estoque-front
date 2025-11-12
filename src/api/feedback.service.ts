// src/api/feedback.service.ts
import api from "./client";

export type Feedback = {
  id_feedback?: number;
  id_paciente: number;
  id_medicamento: number;
  comentario: string;
  tipo: string; // e.g. "reacao_adversa" or "elogio"
  data?: string;
};

export default {
  async list(): Promise<Feedback[]> {
    const res = await api.get("/feedbacks/");
    return res.data;
  },

  async create(payload: Omit<Feedback, "id_feedback" | "data">): Promise<Feedback> {
    const res = await api.post("/feedbacks/", payload);
    return res.data;
  },

  async get(id: number): Promise<Feedback> {
    const res = await api.get(`/feedbacks/${id}`);
    return res.data;
  },

  async listByPaciente(pacienteId: number): Promise<Feedback[]> {
    const res = await api.get(`/feedbacks/paciente/${pacienteId}`);
    return res.data;
  },

  async listByMedicamento(medicamentoId: number): Promise<Feedback[]> {
    const res = await api.get(`/feedbacks/medicamento/${medicamentoId}`);
    return res.data;
  },

  async listByTipo(tipo: string): Promise<Feedback[]> {
    const res = await api.get(`/feedbacks/tipo/${encodeURIComponent(tipo)}`);
    return res.data;
  },

  async update(id: number, payload: Partial<Feedback>): Promise<Feedback> {
    const res = await api.put(`/feedbacks/${id}`, payload);
    return res.data;
  },

  async remove(id: number) {
    const res = await api.delete(`/feedbacks/${id}`);
    return res.data;
  }
};
