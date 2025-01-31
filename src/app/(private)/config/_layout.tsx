import { Stack } from 'expo-router';
/* import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import { usePermissions } from '../../hooks/usePermissions'; */

export default function ConfigLayout() {
/*   useProtectedRoute("config");
  const { allowedScreens } = usePermissions("config"); */

  return (
    <Stack>
      <Stack.Screen name="appConfig" options={{ headerShown: false }} />
     
    </Stack>
  );
}
