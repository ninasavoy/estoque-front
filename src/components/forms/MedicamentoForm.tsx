// src/components/forms/MedicamentoForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import medicamentosService from "../../api/medicamentos.service";
import useAuth from "../../hooks/useAuth";

/**
 * MedicamentoForm - cria ou edita um medicamento.
 *
 * Uso:
 * - Para criar: rota /medicamentos/novo (sem id)
 * - Para editar: rota /medicamentos/:id (id presente)
 *
 * O serviço medicamentosService deve expor:
 * - getById(id)
 * - create(payload)
 * - update(id, payload)
 */

type FormState = {
  nome: string;
  ingestao?: string;
  dosagem?: string;
  preco: string; // usamos string no input e convertemos
  alto_custo: boolean;
};

export default function MedicamentoForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState<FormState>({
    nome: "",
    ingestao: "",
    dosagem: "",
    preco: "0.00",
    alto_custo: false,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    medicamentosService.get(Number(id))
      .then((res) => {
        // mapear campos eventuais
        setForm({
          nome: res.nome ?? "",
          ingestao: res.ingestao ?? "",
          dosagem: res.dosagem ?? "",
          preco: String(res.preco ?? "0.00"),
          alto_custo: !!res.alto_custo,
        });
      })
      .catch((err) => setError(err?.message ?? "Erro ao carregar medicamento"))
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((s) => ({ ...s, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // validações básicas
    if (!form.nome.trim()) {
      setError("Nome é obrigatório");
      setSaving(false);
      return;
    }

    const payload = {
      nome: form.nome,
      ingestao: form.ingestao || null,
      dosagem: form.dosagem || null,
      preco: parseFloat(String(form.preco).replace(",", ".")) || 0,
      alto_custo: !!form.alto_custo,
    };

    try {
      if (id) {
        await medicamentosService.update(Number(id), payload);
      } else {
        await medicamentosService.create(payload);
      }
      navigate("/medicamentos");
    } catch (err: any) {
      setError(err?.message ?? "Erro ao salvar medicamento");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 820 }}>
      <h2>{id ? "Editar Medicamento" : "Novo Medicamento"}</h2>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <form onSubmit={submit}>
          <Input
            label="Nome comercial"
            value={form.nome}
            onChange={(v) => onChange("nome", v)}
            required
            placeholder="Nome do medicamento"
          />

          <Input
            label="Ingestão (ex: oral)"
            value={form.ingestao ?? ""}
            onChange={(v) => onChange("ingestao", v)}
            placeholder="Ex: oral, intravenoso"
          />

          <Input
            label="Dosagem (ex: 10 mg)"
            value={form.dosagem ?? ""}
            onChange={(v) => onChange("dosagem", v)}
            placeholder="Ex: 10 mg"
          />

          <Input
            label="Preço (R$)"
            value={form.preco}
            onChange={(v) => onChange("preco", v)}
            placeholder="0.00"
            type="number"
          />

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={form.alto_custo}
                onChange={(e) => onChange("alto_custo", e.target.checked)}
              />
              <span>Medicamento de alto custo</span>
            </label>
          </div>

          {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Salvando..." : id ? "Salvar alterações" : "Criar medicamento"}
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
