import { useTheme } from "@/src/providers/ThemeProvider";
import { DarkTheme, Theme } from "@/src/styles/theme.style";
import { StyleSheet } from "react-native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "@/src/assets/images";
import { StatusBar } from "expo-status-bar";

interface AuthRouteTemplateProps {
  authImage?: React.ReactNode;
  contentStyle?: ViewStyle;
  content: React.ReactNode;
  viewStyle?: ViewStyle;
}

export default function AuthRouteTemplate({
  viewStyle = {},
  authImage,
  content,
}: AuthRouteTemplateProps) {
  const styles = useStyles();
  const { theme,  } = useTheme();

  // Todo: Mudar cor do statusbar

  /*  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["; */

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar style={theme === DarkTheme ? 'inverted' : "dark"} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, viewStyle]}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={Images.Logo}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <View style={styles.contentContainer}>{content}</View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.mapped.surface.page.default,
    },
    keyboardAvoidingView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.s_20,
    },
    contentContainer: { gap: theme.spacing.s_16 },
    imageContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      flex: 1,
      width: "100%",
    },
  });
};
