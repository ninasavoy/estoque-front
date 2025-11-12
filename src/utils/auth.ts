// src/utils/auth.ts
/**
 * Helpers simples para persistir token e usuário no localStorage.
 * As chaves podem ser adaptadas conforme necessidade.
 */

const TOKEN_KEY = "app_token";
const USER_KEY = "app_user";

/** Token */
export function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    // falha ao persistir -> ignore (opcional: log)
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

/** User (obj) */
export function setUser(user: Record<string, any>) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {}
}

export function getUser(): Record<string, any> | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function removeUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {}
}

/** Limpa toda sessão local */
export function clearAuth() {
  removeToken();
  removeUser();
}

/** Cabeçalho Authorization para requisições (se existir token) */
export function getAuthHeader(): { Authorization?: string } {
  const token = getToken();
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}
