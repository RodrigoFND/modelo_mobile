import { Stack, useLocalSearchParams, useRouter, useSegments } from 'expo-router';
/* import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import { usePermissions } from '../../hooks/usePermissions'; */

export default function ConfigLayout() {

  return (
    <Stack>
      <Stack.Screen name="appConfig" options={{ headerShown: true, title: "appConfig" }} />
      <Stack.Screen name="myRoute" options={{ headerShown: true, title: "myRoute" }} />


    </Stack>
  );
}
