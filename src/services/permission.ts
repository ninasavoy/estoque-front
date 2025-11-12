// src/services/permission.ts
export type Permission = string;

export function hasPermission(permissions: Permission[] | undefined | null, p: Permission): boolean {
  if (!permissions) return false;
  return (permissions || []).includes(p);
}

export function hasAllPermissions(permissions: Permission[] | undefined | null, required: Permission[]): boolean {
  if (!required || required.length === 0) return true;
  if (!permissions) return false;
  return required.every((r) => permissions.includes(r));
}

export function hasAnyPermission(permissions: Permission[] | undefined | null, anyOf: Permission[]): boolean {
  if (!anyOf || anyOf.length === 0) return true;
  if (!permissions) return false;
  return anyOf.some((r) => permissions.includes(r));
}

export const PermissionNames = {
  CREATE_MEDICAMENTO: "create_medicamento",
  LIST_MEDICAMENTO: "list_medicamento",
  UPDATE_MEDICAMENTO: "update_medicamento",
  DELETE_MEDICAMENTO: "delete_medicamento",
  CREATE_LOTE: "create_lote",
  LIST_LOTE: "list_lote",
  UPDATE_LOTE: "update_lote",
  DELETE_LOTE: "delete_lote",
  CREATE_MOVIMENTACAO_DS: "create_movimentacao_ds",
  CREATE_MOVIMENTACAO_SU: "create_movimentacao_su",
  CREATE_MOVIMENTACAO_UP: "create_movimentacao_up",
  VIEW_FARMACEUTICA_DASHBOARD: "view_farmaceutica_dashboard",
  VIEW_DISTRIBUIDOR_DASHBOARD: "view_distribuidor_dashboard",
  VIEW_SUS_DASHBOARD: "view_sus_dashboard",
  VIEW_UBS_DASHBOARD: "view_ubs_dashboard",
} as const;
