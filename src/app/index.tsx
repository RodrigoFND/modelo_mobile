import { router } from "expo-router";
import { View,Text, Button } from "react-native";

export default function Index() {
  return (
   <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ fontSize: 20, fontWeight: "bold",color: "yellow" }}>Root Index</Text>
    <Button title="Go to Public" onPress={() => router.push("/(public)/signIn")} />
    <Button title="Go to Private" onPress={() => router.push("/(private)/config/appConfig")} />
   </View>

  );

}

