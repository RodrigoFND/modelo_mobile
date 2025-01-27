import { useAuth } from "@/src/providers/auth/AuthProvider";
import { Redirect, Slot, Stack } from "expo-router";


export const initialRouteName = 'login'


export default function PublicLayout() {
    const {isAuthenticated} = useAuth()

  
   
    return <Slot />
      
}