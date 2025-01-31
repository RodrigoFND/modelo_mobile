import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/src/providers/authTest/AuthProviderTest';
export default function PublicLayout() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Redirect href="/(private)/config/appConfig" />;
    }

  return <Stack />;
}
