// src/types/api.d.ts
/**
 * Tipos genéricos de resposta da API
 */

export type ApiError = {
  detail?: string;
  message?: string;
  status?: number;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page?: number;
  pageSize?: number;
};

export type ApiResponse<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: ApiError;
    };

/**
 * Tipo utilitário para endpoints que retornam só { message: string }
 */
export type MessageResponse = {
  message: string;
};
