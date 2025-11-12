// src/hooks/usePagination.ts
import { useMemo, useState } from "react";

export type PaginationState = {
  page: number;
  perPage: number;
  total: number;
  setPage: (p: number) => void;
  setPerPage: (n: number) => void;
  offset: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

/**
 * usePagination - hook para paginação
 *
 * @param initialPerPage número inicial de itens por página
 * @param initialTotal total de itens (se desconhecido, passe 0 e atualize quando souber)
 */
export default function usePagination(initialPerPage = 10, initialTotal = 0) {
  const [page, setPageState] = useState<number>(1);
  const [perPage, setPerPageState] = useState<number>(initialPerPage);
  const [total, setTotal] = useState<number>(initialTotal);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / perPage || 1)), [total, perPage]);
  const offset = useMemo(() => (page - 1) * perPage, [page, perPage]);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  function setPage(p: number) {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPageState(p);
  }

  function setPerPage(n: number) {
    setPerPageState(n);
    // resetar para primeira página quando muda o perPage
    setPageState(1);
  }

  return {
    page,
    perPage,
    total,
    setPage,
    setPerPage,
    setTotal,
    offset,
    totalPages,
    hasNext,
    hasPrev,
  } as PaginationState & { setTotal: (t: number) => void };
}
