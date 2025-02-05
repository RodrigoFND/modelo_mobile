import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@/src/components/atom/icon/Icon";
import { Theme } from "@/src/styles/theme.style";
import { useTypedNavigation } from "@/src/hooks/auth/useTypedNavigation";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
export default function PrivateIndex() {
  const { navigate } = useTypedNavigation();
  const { logout, logoutAllSessions } = useAuthAppwrite();

  return (
    <View style={styles.container}>
      <Icon
        name="widgets"
        family="Material"
        size={60}
        color={Theme.colors.primary.primary_default}
      />
      <Text style={styles.title}>Welcome to the Components App</Text>
      <Text style={styles.description}>
        Explore and reuse components to accelerate the development of your app.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate({ route: "PRIVATE_COMPONENTS_ROOT" })}
      >
        <Text style={styles.buttonText}>See Components</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={logoutAllSessions}
      >
        <Text style={styles.buttonText}>Logout All Sesions</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Theme.colors.primary.primary_default,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: Theme.colors.primary.primary_default,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonText: {
    fontSize: 16,
    color: Theme.colors.neutral.neutral_100,
    fontWeight: "bold",
  },
});
