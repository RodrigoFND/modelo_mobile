import { useAuth } from '@/src/providers/authTest/AuthProviderTest';
import { Redirect, Stack } from 'expo-router';


export default function PrivateLayout() {
   const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(public)/signIn" />;
  } 

  return <Stack />;
}
