// src/types/user.ts
/**
 * Tipos relacionados ao usuário e autenticação
 */

export type UserRole = "admin" | "farmaceutica" | "distribuidor" | "sus" | "ubs" | "paciente";

export interface UserBase {
  nome: string;
  email: string;
  senha_hash?: string; // só quando vindo do backend (ou oculto)
  tipo: UserRole;
}

export interface User extends UserBase {
  id: number;
  ativo: boolean;
}

/**
 * Resposta ao fazer login (conforme seu backend /routes/auth.py)
 */
export interface LoginResponse {
  access_token: string;
  token_type: "bearer" | string;
  user: {
    id: number;
    nome: string;
    email: string;
    tipo: UserRole;
  };
  permissions: string[]; // lista de strings de permissões
}

/**
 * Payload para registro (frontend -> backend)
 */
export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
  tipo: UserRole;
}
