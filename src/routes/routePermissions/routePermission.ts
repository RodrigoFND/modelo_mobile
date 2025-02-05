// routePermission.ts
import { PermissionsList, User } from "@/src/models/services/auth.models";
import { PermissionActions } from "@/src/models/services/auth.models";
import { MyRoutes } from "../routes";

/**
 * 🔹 Estrutura de dados para cada recurso (você pode customizar)
 */
type ResourceData = {
  comments: {
    id: string;
    body: string;
    authorId: string;
    createdAt: Date;
  };
  todos: {
    id: string;
    title: string;
    userId: string;
    completed: boolean;
    invitedUsers: string[];
  };
  projects: {
    id: string;
    name: string;
    ownerId: string;
    members: string[];
  };
};

/**
 * 🔹 Estrutura tipada para cada Role (PermissionActions).
 *    Supondo que PermissionActions seja algo como:
 *    {
 *      comments: ("view"|"create"|"update")[];
 *      todos: ("view"|"create"|"update"|"delete")[];
 *      projects: ("view"|"create"|"update"|"delete")[];
 *    }
 */
type RolesStructure = {
  [R in keyof PermissionActions]: {
    [A in PermissionActions[R]]: {
      page: boolean;
      resourceCheck: (user: User, data: ResourceData[R]) => boolean;
    };
  };
};

/**
 * 🔹 Exporte Resource e Action para uso em ProtectedRoute ou em qualquer outro lugar
 *    Resource = keys do RolesStructure (ex.: "comments" | "todos" | "projects")
 *    Action = união de TODAS as ações possíveis para cada Resource
 */
export type Resource = keyof RolesStructure;

/**
 * 🔹 Se quiser um tipo Action que dependa do Resource específico, poderia ser
 *    <R extends Resource> = keyof RolesStructure[R].
 *    Porém, se quiser a união de todas as Actions possíveis em todo RolesStructure:
 */
export type Action = {
  [Res in Resource]: keyof RolesStructure[Res];
}[Resource];

/**
 * 🔹 Função para gerar permissões com base nas permissions do usuário,
 *    retornando um objeto do tipo RolesStructure
 */
const generateRolePermissions = (
  permissions: PermissionsList[]
): RolesStructure => ({
  comments: {
    view: {
      page: permissions.includes("comments:view"),
      resourceCheck: (user, comment) => true,
    },
    create: {
      page: permissions.includes("comments:create"),
      resourceCheck: () => true,
    },
    update: {
      page: permissions.includes("comments:update"),
      resourceCheck: (user, comment) => comment.authorId === user.id,
    },
    delete: {
      page: permissions.includes("comments:delete"),
      resourceCheck: (user, comment) => comment.authorId === user.id,
    },
  },
  todos: {
    view: {
      page: permissions.includes("todos:view"),
      resourceCheck: (user, todo) => true,
    },
    create: {
      page: permissions.includes("todos:create"),
      resourceCheck: () => true,
    },
    update: {
      page: permissions.includes("todos:update"),
      resourceCheck: (user, todo) =>
        todo.userId === user.id || todo.invitedUsers.includes(user.id),
    },
    delete: {
      page: permissions.includes("todos:delete"),
      resourceCheck: (user, todo) =>
        (todo.userId === user.id || todo.invitedUsers.includes(user.id)) &&
        todo.completed,
    },
  },
  projects: {
    view: {
      page: permissions.includes("projects:view"),
      resourceCheck: (user, project) => project.members.includes(user.id),
    },
    create: {
      page: permissions.includes("projects:create"),
      resourceCheck: () => true,
    },
    update: {
      page: permissions.includes("projects:update"),
      resourceCheck: (user, project) =>
        project.ownerId === user.id || project.members.includes(user.id),
    },
    delete: {
      page: permissions.includes("projects:delete"),
      resourceCheck: (user, project) => project.ownerId === user.id,
    },
  },
});

/**
 * 🔹 Função genérica para verificar permissões
 *    Resource => "comments" | "todos" | "projects"
 *    Action   => correspondente às chaves de PermissionActions[R]
 */
function hasRoutePermission<
  R extends Resource,
  A extends keyof RolesStructure[R]
>(
  user: User,
  permissions: PermissionsList[],
  resource: R,
  action: A,
  data?: ResourceData[R]
): boolean {
  try {
    const rolePermissions = generateRolePermissions(permissions);

    if (
      !(resource in rolePermissions) ||
      !(action in rolePermissions[resource])
    ) {
      return false;
    }

    const permission = rolePermissions[resource][action];

    // Se for apenas para verificar a página, retorna o boolean diretamente
    if (!data) {
      return permission.page;
    }

    // Se for uma verificação de recurso, chama a função de verificação
    return permission.page && permission.resourceCheck(user, data);
  } catch (error) {
    return false;
  }
}

/**
 * 🔹 Função para verificar se o usuário tem permissão para acessar uma rota
 *    Route => MyRoutes
 *    User => User | null
 *    PermissionsList => PermissionsList[]
 */

export function canUserAccessPage<P extends Record<string, string> | undefined>(
  route: MyRoutes<P>,
  user: User | null,
  myPermissions: PermissionsList[]
) {
  if (!user) return false;

  return route.permission.every((perm) => {
    const [resource, action] = perm.split(":") as [Resource, Action];
    return hasRoutePermission(
      user,
      myPermissions,
      resource || "",
      action || ""
    );
  });
}

export function canUserAccessPageResource(
  user: User | null,
  myPermissions: PermissionsList[],
  resource: Resource,
  action: Action,
  data: ResourceData[Resource]
) {
  if (!user) return false;

  return hasRoutePermission(user, myPermissions, resource, action, data);
}
