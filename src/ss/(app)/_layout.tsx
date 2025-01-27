import { router, Stack,Redirect  } from "expo-router";
import React, { useEffect, useLayoutEffect } from "react";

import { Slot } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "@/src/providers/auth/AuthProvider";

export default function AppLayout() {
  const { isAuthInitialized: isLoading, isAuthenticated } = useAuth();

  // It is OK to defer rendering this nested layout's content. We couldn't
  // defer rendering the root layout's content since a navigation event (the
  // redirect) would have been triggered before the root layout's content had
  // been mounted.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sobre");
    }
  }, [isAuthenticated]);

  return (
    <Stack initialRouteName="sobre">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sobre" options={{ headerShown: false }} />
    </Stack>
  );
}
