import { useTheme } from "@/src/providers/ThemeProvider";
import { scaleSize } from "@/src/styles/mixing.style";
import { DarkTheme, Theme } from "@/src/styles/theme.style";
import { StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface PrivateRouteTemplateProps {
  children: React.ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
}

export default function PrivateRouteTemplate({
  children,
  viewStyle,
}: PrivateRouteTemplateProps) {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.mapped.surface.page.default }}>
      <StatusBar style={theme === DarkTheme ? 'inverted' : "dark"} />
      <View style={[viewStyle, { flex: 1, padding: Theme.spacing.s_20 }]}>
        {children}
      </View>
    </SafeAreaView>
  );
}
