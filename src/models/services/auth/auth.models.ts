// 🔹 Definição dos tipos de recursos e suas ações permitidas
export type Roles = 'admin' | 'basic'
type Actions = 'view' | 'create' | 'update' | 'delete'

export type PermissionActions = {
  comments: Actions;
  todos: Actions;
  projects: Actions; // 🔹 Exemplo de outro recurso
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