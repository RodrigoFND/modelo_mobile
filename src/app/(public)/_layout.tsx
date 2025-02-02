import { Redirect, Stack } from 'expo-router';
import { useAuthAppwrite } from '@/src/providers/authAppwrite/AuthAppwrite';
export default function PublicLayout() {
    const { isAuthenticated } = useAuthAppwrite();

    if (isAuthenticated) {
        return <Redirect href="/(private)/config/appConfig" />;
    }

  return <Stack />;
}
