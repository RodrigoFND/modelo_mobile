import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@/src/components/atom/icon/Icon";
import { Theme } from "@/src/styles/theme.style";
import { useTypedNavigation } from "@/src/hooks/auth/useTypedNavigation";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import Text from "@/src/components/atom/text/Text";
import Button from "@/src/components/atom/button/Button";
import PrivateRouteTemplate from "@/src/components/template/PrivateRouteTemplate";

export default function PrivateIndex() {
  const { navigate } = useTypedNavigation();
  const { logout, logoutAllSessions } = useAuthAppwrite();

  return (
    <PrivateRouteTemplate viewStyle={styles.container}>
      <Icon name="widgets" family="Material" variant="xxl" action="primary" />
      <Text
        action="primary"
        variant="h1_small"
        weight="bold"
        style={{ textAlign: "center" }}
      >
        Components App
      </Text>
      <Text
        action="neutral"
        variant="paragraph_large_18"
        weight="regular"
        style={{ textAlign: "center" }}
      >
        Explore and reuse components to accelerate the development of your app.
      </Text>

      <Button.Root
        action="primary"
        variant="md"
        onPress={() => navigate({ route: "PRIVATE_COMPONENTS_ROOT" })}
      >
        <Button.Text>See Components</Button.Text>
      </Button.Root>

      <Button.Root action="warning" variant="md" onPress={logout}>
        <Button.Text>Logout</Button.Text>
      </Button.Root>
    </PrivateRouteTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
