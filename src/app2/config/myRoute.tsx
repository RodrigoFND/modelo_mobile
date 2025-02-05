/* import { APP_ROUTES } from "@/src/routes/routes";
import {
  useTypedNavigation,
  useTypedSearchParams,
} from "@/src/hooks/auth/useTypedNavigation";
import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

export default function TestScreen() {
  const { navigate } = useTypedNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Ir para appConfig"
        onPress={() => router.push(APP_ROUTES.PRIVATE_APPCONFIG.path)}
      />
      <Button
        title="Ir para appConfig com safeRouter"
        onPress={() => navigate({ route: "PRIVATE_APPCONFIG" })}
      />

      <Button
        title="Ir para HOME (exige userId)"
        onPress={() => {
          // O TS obriga a passar { params: { userId: string } }
          navigate({ route: "PRIVATE_APPCONFIG" });
        }}
      />

      <Button
        title="Ir para ABOUT (sem params)"
        onPress={() => {
          // 'ABOUT' não tem params => chamamos só com { route: 'ABOUT' }
          navigate({ route: "PRIVATE_MYROUTE" });
        }}
      />
    </View>
  );
}
 */