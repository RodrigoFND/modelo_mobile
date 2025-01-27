import { useAuth } from "@/src/providers/auth/AuthProvider";
import { Redirect, Slot, Stack } from "expo-router";

export const initialRouteName = 'lista-users';

export default function PrivateLayout() {
    const {isAuthenticated} = useAuth()

  
        return <Slot />
}