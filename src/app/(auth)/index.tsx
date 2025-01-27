import { useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";

export default function Auth() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <View>
      <Text> "Hello World" </Text>
    </View>
  );
}
