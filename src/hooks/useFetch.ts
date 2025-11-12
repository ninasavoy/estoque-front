// src/hooks/useFetch.ts
import { useEffect, useRef, useState } from "react";

/**
 * useFetch - hook genérico para chamadas assíncronas
 *
 * @param fetcher função assíncrona que realiza a requisição: () => Promise<T>
 * @param deps dependências para re-executar a chamada
 * @param options opções: enabled (boolean)
 */
export function useFetch<T>(fetcher: () => Promise<T>, deps: any[] = [], options?: { enabled?: boolean }) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(options?.enabled ?? true);
  const [error, setError] = useState<any>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let mounted = true;
    const enabled = options?.enabled ?? true;
    if (!enabled) return;

    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetcher();
        if (!signal.aborted && mounted) {
          setData(res);
        }
      } catch (err) {
        if (!signal.aborted && mounted) {
          setError(err);
        }
      } finally {
        if (!signal.aborted && mounted) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      mounted = false;
      abortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
