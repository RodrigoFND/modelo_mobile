import { useFonts } from "expo-font";
import { Redirect, router, Slot, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import { ActivityIndicator, Text, View } from "react-native";
import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { AppState, Platform } from "react-native";
import { AppStateStatus } from "react-native";
import {
  focusManager,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Entypo } from "@expo/vector-icons";
import * as Font from "expo-font";
import {
  AuthProviderAppwrite,
  useAuthAppwrite,
} from "@/src/providers/authAppwrite/AuthAppwrite";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/src/utils/secureStore/oAuthStore/oAuthStore";
import { Theme } from "@/src/styles/theme.style";
import { ThemeProvider } from "@/src/providers/ThemeProvider";
import {
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import AmbientVariables from "@/src/env";
import * as WebBrowser from "expo-web-browser";
import { useTypedNavigation } from "../hooks/auth/useTypedNavigation";
import Indicator from "../components/atom/indicator/Indicator";
import LoadingScreenTemplate from "../components/template/LoadingScreenTemplate";

onlineManager.setEventListener((setOnline) => {
  const subscription = Network.addNetworkStateListener((state) => {
    setOnline(state.isConnected ?? false);
  });
  return () => subscription.remove();
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export const unstable_settings = {
  initialRouteName: "(app)", //escolhe o index da primeira tela a ser carregada
};

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("@/src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all([
          Font.loadAsync({
            Mulish_400Regular,
            Mulish_500Medium,
            Mulish_600SemiBold,
            Mulish_700Bold,
            DMSans_400Regular,
            DMSans_500Medium,
            DMSans_700Bold,
          }),
          Font.loadAsync(Entypo.font),
        ]);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        /*  await new Promise((resolve) => setTimeout(resolve, 2000)); */
      } catch (e) {
/*         console.warn(e); */
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    // Inicializa a sessão de autenticação
    WebBrowser.maybeCompleteAuthSession();

    // Warm up do WebBrowser
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  useEffect(() => {
    onAppStateChange(AppState.currentState);
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <AuthProviderAppwrite>
          <QueryClientProvider client={queryClient}>
            <RootLayoutNav />
          </QueryClientProvider>
        </AuthProviderAppwrite>
      </ThemeProvider>
    </View>
  );
}

function RootLayoutNav() {
  const { isLoading, isAuthenticated } = useAuthAppwrite();
  const segments = useSegments();
  const { navigate } = useTypedNavigation();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const inAuthGroup = segments[0] === "(private)";
    const isPublicRoute = segments[0] === "(public)";
    if (isAuthenticated && !inAuthGroup) {
      navigate({ route: "PRIVATE_ROOT", replace: true });
    } else if (!isAuthenticated && !isPublicRoute) {
      console.log(segments[0]);
      navigate({ route: "PUBLIC_SIGNIN", replace: true });
    }
  }, [isLoading, isAuthenticated, segments]);

  if (isLoading) {
    return <LoadingScreenTemplate />;
  }

  /* console.log(PUBLIC_CLERK_PUBLISHABLE_KEY); */
  return <Slot screenOptions={{ animation: "fade" }} />;
}
