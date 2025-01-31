import { useAuth } from "@/src/providers/auth/AuthProvider";
import { router, usePathname } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Login() {
    const pathname = usePathname();
    const username = "emilys";
    const password = "emilyspass";

    const { signIn } = useAuth();
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "red" }}>Currentpath: {pathname}</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>Login</Text>
        <Button title="Login" onPress={() => {signIn(username, password)}} />
    </View>;
}