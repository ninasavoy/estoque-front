// src/components/forms/LoteForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import lotesService from "../../api/lotes.service";
import medicamentosService from "../../api/medicamentos.service";
import { useFetch } from "../../hooks/useFetch";

/**
 * LoteForm - cria ou edita lotes.
 * Campos principais: codigo_lote, data_fabricacao, data_vencimento, quantidade, id_medicamento
 *
 * Requisitos: lotesService.create/update/getById; medicamentosService.list()
 */

type FormState = {
  codigo_lote: string;
  data_fabricacao: string; // yyyy-mm-dd
  data_vencimento: string;
  quantidade: number;
  id_medicamento?: number | null;
};

export default function LoteForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    codigo_lote: "",
    data_fabricacao: "",
    data_vencimento: "",
    quantidade: 0,
    id_medicamento: null,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // buscar lista de medicamentos para select
  const { data: medicamentos, loading: medsLoading } = useFetch(
    () => medicamentosService.list(), // espera lista
    [],
    { enabled: true }
  );

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    lotesService.get(Number(id))
      .then((res) => {
        setForm({
          codigo_lote: res.codigo_lote ?? "",
          data_fabricacao: res.data_fabricacao ? res.data_fabricacao.split("T")[0] : "",
          data_vencimento: res.data_vencimento ? res.data_vencimento.split("T")[0] : "",
          quantidade: res.quantidade ?? 0,
          id_medicamento: res.id_medicamento ?? null,
        });
      })
      .catch((err) => setError(err?.message ?? "Erro ao carregar lote"))
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!form.codigo_lote.trim()) {
      setError("Código do lote é obrigatório");
      setSaving(false);
      return;
    }
    if (!form.id_medicamento) {
      setError("Selecione o medicamento associado");
      setSaving(false);
      return;
    }

    const payload = {
      codigo_lote: form.codigo_lote,
      data_fabricacao: form.data_fabricacao,
      data_vencimento: form.data_vencimento,
      quantidade: Number(form.quantidade),
      id_medicamento: Number(form.id_medicamento),
    };

    try {
      if (id) {
        await lotesService.update(Number(id), payload);
      } else {
        await lotesService.create(payload);
      }
      navigate("/lotes");
    } catch (err: any) {
      setError(err?.message ?? "Erro ao salvar lote");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 820 }}>
      <h2>{id ? "Editar Lote" : "Novo Lote"}</h2>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <form onSubmit={submit}>
          <Input
            label="Código do lote"
            value={form.codigo_lote}
            onChange={(v) => onChange("codigo_lote", v)}
            required
            placeholder="EX: L2025-001"
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input
              label="Data de fabricação"
              value={form.data_fabricacao}
              onChange={(v) => onChange("data_fabricacao", v)}
              type="date"
              required
            />
            <Input
              label="Data de vencimento"
              value={form.data_vencimento}
              onChange={(v) => onChange("data_vencimento", v)}
              type="date"
              required
            />
          </div>

          <Input
            label="Quantidade"
            value={String(form.quantidade)}
            onChange={(v) => onChange("quantidade", Number(v || 0))}
            type="number"
            required
          />

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Medicamento</label>
            <select
              value={form.id_medicamento ?? ""}
              onChange={(e) => onChange("id_medicamento", e.target.value ? Number(e.target.value) : null)}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
            >
              <option value="">-- selecione --</option>
              {(medicamentos ?? []).map((m: any) => (
                <option key={m.id_medicamento ?? m.id} value={m.id_medicamento ?? m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
            {medsLoading && <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>Carregando medicamentos...</div>}
          </div>

          {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Salvando..." : id ? "Salvar lote" : "Criar lote"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
