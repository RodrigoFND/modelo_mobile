import { PermissionsList, User } from "@/src/models/services/auth/auth.models";
import { PermissionActions } from "@/src/models/services/auth/auth.models";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import { router } from "expo-router";
import { View, Text, Button } from "react-native";
import { APP_ROUTES } from "@/src/routes/routes";
import { useTypedNavigation } from "@/src/routes/useTypedNavigation";

// 🔹 Estrutura de dados para cada recurso
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

// 🔹 Estrutura tipada para cada Role
type RolesStructure = {
  [R in keyof PermissionActions]: {
    [A in PermissionActions[R]]: {
      page: boolean;
      resourceCheck: (user: User, data: ResourceData[R]) => boolean;
    };
  };
};


// 🔹 Função para gerar permissões com base no backend
const ROLES = (permissions: PermissionsList[]): RolesStructure => ({
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
      resourceCheck: (user, todo) => todo.userId === user.id || todo.invitedUsers.includes(user.id),
    },
    delete: {
      page: permissions.includes("todos:delete"),
      resourceCheck: (user, todo) => (todo.userId === user.id || todo.invitedUsers.includes(user.id)) && todo.completed,
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
      resourceCheck: (user, project) => project.ownerId === user.id || project.members.includes(user.id),
    },
    delete: {
      page: permissions.includes("projects:delete"),
      resourceCheck: (user, project) => project.ownerId === user.id,
    },
  },
});

// 🔹 Função genérica para verificar permissões
export function hasPermission<
  Resource extends keyof RolesStructure,
  Action extends keyof RolesStructure[Resource]
>(
  user: User,
  permissions: PermissionsList[],
  resource: Resource,
  action: Action,
  data?: ResourceData[Resource]
): boolean {
  try {
    const rolePermissions = ROLES(permissions);
    console.log("rolePermissions", (resource in rolePermissions) );

    if (!(resource in rolePermissions) || !(action in rolePermissions[resource])) {
      return false;
    }

    const permission = rolePermissions[resource][action];

    // 🔹 Se for apenas para verificar a página, retorna o boolean diretamente
    if (!data) {
      return permission.page;
    }

    // 🔹 Se for uma verificação de recurso, chama a função de verificação
    return permission.page && permission.resourceCheck(user, data);
  } catch (error) {
    return false;
  }
}

// 🔹 Exemplo de uso correto
export default function AppConfig() {
  const { user, permissions, updateSession } = useAuthAppwrite();
  const { navigate } = useTypedNavigation();
  console.log("permissions", permissions);

  const todo = {
    completed: false,
    id: "3",
    invitedUsers: [],
    title: "Test Todo",
    userId: "1",
  };

  const comment = {
    id: "10",
    body: "Hello World",
    authorId: "1",
    createdAt: new Date(),
  };

  const project = {
    id: "20",
    name: "My Project",
    ownerId: "1",
    members: ["1", "2", "3"],
  };

  
  return (
    <View>
      <Button title="Ir para myRoute" onPress={() => router.push(APP_ROUTES.MYROUTE.path)} />
      <Button title="Ir para myRoute com safeRouter" onPress={() => navigate({ route: 'MYROUTE' })} />
      <Button title="Update Session" onPress={updateSession} />



    {/*   { user && hasPermission(user, permissions, "comments", "create") ? (
        <Text style={{ color: "green" }}>Can create comment</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot create comment</Text>
      )}

      {user && hasPermission(user, permissions, "todos", "view") ? (
        <Text style={{ color: "green" }}>Can view all todos</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot view all todos</Text>
      )}
 */}
      {user && hasPermission(user, permissions, "todos", "view", todo) ? (
        <Text style={{ color: "green" }}>Can view this specific todo</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot view this specific todo</Text>
      )}


   {/*    {user && hasPermission(user, permissions, "projects", "view", project) ? (
        <Text style={{ color: "green" }}>Can view this project</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot view this project</Text>
      )} */}

    </View>
  );
}
