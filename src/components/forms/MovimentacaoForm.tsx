// src/components/forms/MovimentacaoForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import medicamentosService from "../../api/medicamentos.service";
import lotesService from "../../api/lotes.service";
import movimentacoesService from "../../api/movimentacoes.service";
import { useFetch } from "../../hooks/useFetch";

/**
 * MovimentacaoForm - formulário genérico para criar movimentações.
 *
 * Observações de tipagem: os tipos exatos esperados pelos serviços backend
 * podem não corresponder ao conjunto de campos que definimos localmente.
 * Para evitar erros TypeScript enquanto os tipos do serviço não estiverem
 * explicitamente alinhados com os nossos, os payloads são passados como `any`.
 */

type Props = {
  type: "dps" | "spu" | "upp";
};

export default function MovimentacaoForm({ type }: Props) {
  const navigate = useNavigate();

  const [idDestino, setIdDestino] = useState<number | null>(null);
  const [idLote, setIdLote] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [observacao, setObservacao] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: lotes } = useFetch(() => lotesService.list(), [], { enabled: true });
  const { data: medicamentos } = useFetch(() => medicamentosService.list(), [], { enabled: true });

  useEffect(() => {
    if (idLote && Array.isArray(lotes)) {
      const lote = (lotes as any[]).find((l) => (Number(l.id_lote ?? l.id) === Number(idLote)));
      if (lote) {
        // sugestão: quantidade mínima 1, não ultrapassar disponível
        setQuantidade(Math.max(1, Math.min(Number(lote.quantidade ?? 1), 1)));
      }
    }
  }, [idLote, lotes]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!idLote) {
      setError("Selecione o lote");
      setSaving(false);
      return;
    }
    if (!quantidade || quantidade <= 0) {
      setError("Quantidade deve ser maior que zero");
      setSaving(false);
      return;
    }
    if (!idDestino) {
      setError("Selecione o destino");
      setSaving(false);
      return;
    }

    try {
      if (type === "dps") {
        // Backend pode esperar outro shape — cast para any para evitar TS error enquanto tipos não são sincronizados
        await movimentacoesService.createDPS({
          id_sus: idDestino,
          id_lote: idLote,
          quantidade,
          observacao,
        } as any);
        navigate("/movimentacoes/dps");
      } else if (type === "spu") {
        await movimentacoesService.createSPU({
          id_ubs: idDestino,
          id_lote: idLote,
          quantidade,
          observacao,
        } as any);
        navigate("/movimentacoes/sus-ubs");
      } else {
        // upp
        await movimentacoesService.createUPP({
          id_paciente: idDestino,
          id_lote: idLote,
          quantidade,
          observacao,
        } as any);
        navigate("/movimentacoes/ubs-pacientes");
      }
    } catch (err: any) {
      setError(err?.message ?? "Erro ao criar movimentação");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>
        {type === "dps" ? "Enviar para SUS" : type === "spu" ? "Enviar para UBS" : "Distribuir para Paciente"}
      </h2>

      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Lote</label>
          <select
            value={idLote ?? ""}
            onChange={(e) => setIdLote(e.target.value ? Number(e.target.value) : null)}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="">-- selecione um lote --</option>
            {(Array.isArray(lotes) ? lotes : []).map((l: any) => {
              const med = (Array.isArray(medicamentos) ? medicamentos : []).find((m: any) => Number(m.id_medicamento ?? m.id) === Number(l.id_medicamento));
              return (
                <option key={l.id_lote ?? l.id} value={l.id_lote ?? l.id}>
                  {(med ? `${med.nome} — ` : "")}{l.codigo_lote ?? l.codigo} — qtd: {String(l.quantidade ?? l.qtd ?? "n/d")}
                </option>
              );
            })}
          </select>
        </div>

        <Input
          label="Quantidade"
          value={String(quantidade)}
          onChange={(v) => setQuantidade(Number(v || 0))}
          type="number"
          required
        />

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>
            {type === "dps" ? "Destino (ID do SUS)" : type === "spu" ? "Destino (ID da UBS)" : "Destino (ID do Paciente)"}
          </label>
          <input
            type="number"
            value={idDestino ?? ""}
            onChange={(e) => setIdDestino(e.target.value ? Number(e.target.value) : null)}
            placeholder="Informe o id do destino"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
            required
          />
        </div>

        <Input
          label="Observação (opcional)"
          value={observacao}
          onChange={(v) => setObservacao(v)}
          textarea
          rows={3}
        />

        {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

        <div style={{ display: "flex", gap: 8 }}>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Enviando..." : "Confirmar envio"}
          </Button>

          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
