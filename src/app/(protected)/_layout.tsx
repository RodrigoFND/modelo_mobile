import { useAuth } from "@/src/providers/auth/AuthProvider";
import {  Redirect, Stack } from "expo-router";


export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
/*   if (!isAuthenticated) {
    return <Redirect href="/login" />
  }
 */
  return (
    <Stack>
      <Stack.Screen name="lista-users" options={{ headerShown: false }} />
    </Stack>
  );
}
