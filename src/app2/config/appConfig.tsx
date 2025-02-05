/* import { View, Text, Button } from "react-native";

import { useTypedNavigation } from "@/src/hooks/auth/useTypedNavigation";
import { APP_ROUTES } from "@/src/routes/routes";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import { router } from "expo-router";
import { hasRoutePermission } from "@/src/routes/routePermissions/routePermission";




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

      <Button title="Logout" onPress={logout} />






      {user && hasRoutePermission(user, permissions, "todos", "view", todo) ? (
        <Text style={{ color: "green" }}>Can view this specific todo</Text>
      ) : (
        <Text style={{ color: "red" }}>Cannot view this specific todo</Text>
      )}



    </View>
  );
}
 */