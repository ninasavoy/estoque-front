// src/hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * useDebounce
 * Debounce um valor com atraso `delay` (ms).
 *
 * Útil para inputs de busca para evitar chamadas a cada tecla.
 */
export default function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
