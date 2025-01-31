import { View, Text } from "react-native";

type Comments = {
  id: string;
  body: string;
  authorId: string;
  createdAt: Date;
};

type Todo = {
  id: string;
  title: string;
  userId: string;
  completed: boolean;
  invitedUsers: string[];
};

// 🔹 Definição das ações permitidas para cada recurso
type PermissionActions = {
  comments: "view" | "create" | "update";
  todos: "view" | "create" | "update" | "delete";
};

// 🔹 Lista válida de permissões
type PermissionsList = `${keyof PermissionActions}:${PermissionActions[keyof PermissionActions]}`;

// 🔹 Estrutura com Type Safety total
type RolesStructure = {
  [R in keyof PermissionActions]: {
    [A in PermissionActions[R]]: {
      page: boolean;
      resourceCheck: (user: UserSession, data: any) => boolean;
    };
  };
};

// 🔹 Estrutura do usuário (agora usamos apenas `UserSession`)
type UserSession = {
  session: {
    $id: string;
    userId: string;
    expire: string;
  };
  blockedBy: string[];
  teams: {
    teamId: string;
    teamName: string; // 🔹 Agora sabemos que `teamName` = `role`
    permissions: PermissionsList[];
  }[];
};

// 🔹 Função para extrair roles e permissions do usuário baseado na API
function getUserRolesAndPermissions(userData: UserSession) {
  const roles = userData.teams.map((team) => team.teamName); // 🔹 Pegamos todos os teamNames como roles
  const permissions = userData.teams.flatMap((team) => team.permissions); // 🔹 Pegamos todas as permissões

  return { roles, permissions };
}

// 🔹 Definição das permissões dinâmicas
const ROLES = (permissions: PermissionsList[]): RolesStructure => ({
  comments: {
    view: {
      page: permissions.includes("comments:view"),
      resourceCheck: (user: UserSession, comment: Comments) => !user.blockedBy.includes(comment.authorId),
    },
    create: {
      page: permissions.includes("comments:create"),
      resourceCheck: () => true, // Criar não precisa verificar recurso específico
    },
    update: {
      page: permissions.includes("comments:update"),
      resourceCheck: (user: UserSession, comment: Comments) => comment.authorId === user.session.userId,
    },
  },
  todos: {
    view: {
      page: permissions.includes("todos:view"),
      resourceCheck: (user: UserSession, todo: Todo) => !user.blockedBy.includes(todo.userId),
    },
    create: {
      page: permissions.includes("todos:create"),
      resourceCheck: () => true,
    },
    update: {
      page: permissions.includes("todos:update"),
      resourceCheck: (user: UserSession, todo: Todo) => todo.userId === user.session.userId || todo.invitedUsers.includes(user.session.userId),
    },
    delete: {
      page: permissions.includes("todos:delete"),
      resourceCheck: (user: UserSession, todo: Todo) => (todo.userId === user.session.userId || todo.invitedUsers.includes(user.session.userId)) && todo.completed,

    },
  },
});

// 🔹 Função hasPermission() melhorada
export function hasPermission<Resource extends keyof RolesStructure, Action extends keyof RolesStructure[Resource]>(
  user: UserSession,
  permissions: PermissionsList[],
  resource: Resource,
  action: Action,
  data?: Resource extends "comments" ? Comments : Todo
): boolean {
  try {
    const rolePermissions = ROLES(permissions);
    const permission = rolePermissions[resource][action];

    if (!data) {
      return permission.page;
    }

    return permission.resourceCheck(user, data);
  } catch (error) {
    return false;
  }
}

// 🔹 Simulação de dados da API do backend
const userData: UserSession = {
  session: {
    $id: "1",
    userId: "user_123",
    expire: "2025-12-31T23:59:59.999Z",
  },
  blockedBy: ["2"],
  teams: [
    {
      teamId: "team_1",
      teamName: "basic",
      permissions: ["comments:create"],
    },
    {
      teamId: "team_2",
      teamName: "admin",
      permissions: ["todos:view"],
    },
  ],
};

// 🔹 Extraímos roles e permissions a partir do backend
const { roles, permissions } = getUserRolesAndPermissions(userData);

// 🔹 Exemplo de uso correto
export default function AppConfig() {
  const user = userData; // Agora usamos apenas `userData`

  const todo: Todo = {
    completed: false,
    id: "3",
    invitedUsers: [],
    title: "Test Todo",
    userId: "1",
  };

  const comment: Comments = {
    id: "10",
    body: "Hello World",
    authorId: "2",
    createdAt: new Date(),
  };

  return (
    <View>
      {hasPermission(user, permissions, "comments", "create") ? (
        <Text style={{ color: "green" }}>Can create comment</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot create comment</Text>
      )}

      {hasPermission(user, permissions, "todos", "view") ? (
        <Text style={{ color: "green" }}>Can view all todos</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot view all todos</Text>
      )}

      {hasPermission(user, permissions, "todos", "view", todo) ? (
        <Text style={{ color: "green" }}>Can view this specific todo</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot view this specific todo</Text>
      )}
      {hasPermission(user, permissions, "comments", "view", comment) ? (
        <Text style={{ color: "green" }}>Can view this specific comment</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot view this specific comment</Text>
      )}

    </View>
  );
}
