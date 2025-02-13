import { View } from "react-native";
import Indicator from "../atom/indicator/Indicator";
import { useTheme } from "@/src/providers/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { DarkTheme } from "@/src/styles/theme.style";

export default function LoadingScreenTemplate() {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor: theme.mapped.surface.default }}>
      <StatusBar style={theme === DarkTheme ? 'inverted' : "dark"} />
      <Indicator name="progress" variant="xxl" action="primary" />
    </View>
  );
}
