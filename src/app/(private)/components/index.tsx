import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter, Route } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@/src/styles/theme.style";
import { APP_ROUTES } from "@/src/routes/routes";

const buttonPath = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_BUTTONS.path;
const testeUmPath = APP_ROUTES.PRIVATE_COMPONENTS_PAGES_TESTEUM_LIST.path;
const textPath = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_TEXTS.path;
const inputsPath = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_INPUTS.path;

const componentsData: Record<string, { title: string; path: Route }[]> = {
  Atoms: [{ title: "Buttons", path: buttonPath },{ title: "Text", path: textPath },{ title: "Inputs", path: inputsPath }],
  Pages: [{ title: "Teste Um", path: testeUmPath }],
};

export default function ComponentsIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Componentes</Text>

        {Object.entries(componentsData).map(([category, components]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>{category}</Text>
            <FlatList
              data={components}
              keyExtractor={(item) => item.path}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.componentButton}
                  onPress={() => router.push(item.path)}
                >
                  <Text style={styles.componentText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Theme.colors.primary.primary_default,
    marginBottom: 15,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.neutral.neutral_600,
    marginBottom: 10,
  },

  componentButton: {
    backgroundColor: Theme.colors.primary.primary_default,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },

  componentText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
