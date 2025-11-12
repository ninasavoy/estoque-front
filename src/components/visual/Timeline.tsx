import React from "react";

/**
 * Timeline - lista eventos cronológicos.
 *
 * Compatibilidade:
 * - Aceita prop antiga: events: EventItem[]
 * - Aceita prop nova (usada nas páginas): items: Array<{ title, subtitle?, date, meta?, ... }>
 *
 * Cada item pode ter:
 * - id?: string|number
 * - title: string
 * - description? or subtitle?: string
 * - actor? or meta?: string
 * - date: string|Date|number
 * - location?: string
 */

type EventItem = {
  id?: string | number;
  title: string;
  description?: string;
  actor?: string;
  date: string | Date | number;
  location?: string;
  // backwards compat fields
  subtitle?: string;
  meta?: string;
};

type Props = {
  // new name used in pages
  items?: EventItem[] | any[];
  // old name
  events?: EventItem[] | any[];
  // optional max items to render
  maxItems?: number;
  className?: string;
};

export default function Timeline({ items, events, maxItems, className }: Props) {
  const raw = items ?? events ?? [];
  if (!raw || raw.length === 0) {
    return <div style={{ color: "#666" }}>Nenhum evento disponível</div>;
  }

  // normalize items into EventItem[]
  const normalized: EventItem[] = raw.map((it: any, idx: number) => {
    // if already looks like EventItem, keep; else map common fields
    const id = it.id ?? it.key ?? idx;
    const title = it.title ?? it.name ?? it.event ?? `Evento ${idx + 1}`;
    const date = it.date ?? it.time ?? it.created_at ?? it.vencimento ?? null;
    const description = it.description ?? it.subtitle ?? it.details ?? null;
    const actor = it.actor ?? it.meta ?? it.by ?? null;
    const location = it.location ?? null;

    return {
      id,
      title,
      date,
      description,
      actor,
      location,
      // keep subtitle/meta for debug if present
      subtitle: it.subtitle,
      meta: it.meta,
    };
  });

  // sort desc by date (most recent first). items without date go to the end.
  const sorted = normalized.sort((a, b) => {
    const da = a.date ? new Date(String(a.date)).getTime() : -Infinity;
    const db = b.date ? new Date(String(b.date)).getTime() : -Infinity;
    return db - da;
  });

  const toRender = typeof maxItems === "number" ? sorted.slice(0, maxItems) : sorted;

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {toRender.map((ev) => (
        <div key={String(ev.id ?? `${ev.title}-${ev.date}`)} style={{ display: "flex", gap: 12 }}>
          <div style={{ minWidth: 10, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#0b74de", marginTop: 6 }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div style={{ fontWeight: 700 }}>{ev.title}</div>
              <div style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>
                {ev.date ? new Date(String(ev.date)).toLocaleString() : <span className="text-muted">sem data</span>}
              </div>
            </div>

            {(ev.actor || ev.location) && (
              <div style={{ fontSize: 13, color: "#444", marginTop: 6 }}>
                {ev.actor ?? ev.meta ?? ""}{ev.location ? ` — ${ev.location}` : ""}
              </div>
            )}

            {(ev.description || ev.subtitle) && (
              <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
                {ev.description ?? ev.subtitle}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
