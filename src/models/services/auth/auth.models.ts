// 🔹 Definição dos tipos de recursos e suas ações permitidas
export type Roles = 'admin' | 'basic'

export type PermissionActions = {
  comments: "view" | "create" | "update";
  todos: "view" | "create" | "update" | "delete";
  projects: "view" | "create" | "update" | "delete"; // 🔹 Exemplo de outro recurso
};

// 🔹 Lista válida de permissões no formato "resource:action"
export type PermissionsList = `${keyof PermissionActions}:${PermissionActions[keyof PermissionActions]}`;

export interface Team {
    id: string;
    name: Roles;
    permissions: PermissionsList[];
}


export interface User {
    id: string;
    email: string;
    teams: Team[];
    username: string;
    avatar: URL;
}