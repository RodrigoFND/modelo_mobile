import { useAuthAppwrite } from '@/src/providers/authAppwrite/AuthAppwrite';
import { Redirect, Stack } from 'expo-router';


export default function PrivateLayout() {
   const { isAuthenticated } = useAuthAppwrite();

  if (!isAuthenticated) {
    return <Redirect href="/(public)/signIn" />;
  } 

  return <Stack />;
}
