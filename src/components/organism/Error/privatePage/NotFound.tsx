import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold",color:'red' }}>Página não encontrada</Text>
      <Text style={{ marginTop: 10, fontSize: 16 }}>Parece que essa página não existe.</Text>

      <Button title="Voltar para o início" onPress={() => router.replace("/")} />
    </View>
  );
}
