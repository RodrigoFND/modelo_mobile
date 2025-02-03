import { View, Text, Button } from "react-native";

import { useTypedNavigation } from "@/src/hooks/auth/useTypedNavigation";
import { APP_ROUTES } from "@/src/routes/routes";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import { router } from "expo-router";
import { hasRoutePermission } from "@/src/routes/routePermissions/routePermission";


// 🔹 Exemplo de uso correto

export default function AppConfig() {
  const { user, permissions, updateSession,logout } = useAuthAppwrite();
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
      <Text>User permissions: {permissions.join(", ")}</Text>
      <Button title="Ir para myRoute" onPress={() => router.push('/')} />
      <Button title="Ir para myRoute com safeRouter" onPress={() => navigate({ route: 'PRIVATE_MYROUTE' })} />
      <Button title="Logout" onPress={logout} />





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
      {user && hasRoutePermission(user, permissions, "todos", "view", todo) ? (
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
