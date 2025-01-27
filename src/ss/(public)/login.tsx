import { useAuth } from "@/src/providers/auth/AuthProvider";
import { router } from "expo-router";
import { View,Text, Button } from "react-native";

export default function Login() {
    const {signIn} = useAuth()
    const username = 'test_user'
    const email = 'test_user@example.com'
    const password = 'password123'
    

    const handleSignIn = () => {
        signIn(username, password).then(() => {
            router.push("/lista-users")
        }).catch((error) => {
            console.log('error', error)
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            
            <Button title="Teste" onPress={handleSignIn} />
                <Text style={{ fontFamily: "SpaceMono", color: "red" }}>Login</Text>
            </View>
    )
}