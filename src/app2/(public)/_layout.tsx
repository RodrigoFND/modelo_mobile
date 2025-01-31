import { useAuth } from "@/src/providers/auth/AuthProvider";
import {  Redirect, Stack } from "expo-router";


export default function PublicLayout() {
    const { isAuthenticated } = useAuth();
   /*  if (isAuthenticated) {
        return <Redirect href="/(protected)/lista-users" />
      } */
    
  
    return <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
}