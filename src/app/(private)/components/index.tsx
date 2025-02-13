import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter, Route } from "expo-router";
import { APP_ROUTES } from "@/src/routes/routes";
import Text from "@/src/components/atom/text/Text";
import Button from "@/src/components/atom/button/Button";
import PrivateRouteTemplate from "@/src/components/template/PrivateRouteTemplate";

const buttonPath = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_BUTTONS.path;
const testeUmPath = APP_ROUTES.PRIVATE_COMPONENTS_PAGES_TESTEUM_LIST.path;
const textPath = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_TEXTS.path;
const inputsPath = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_INPUTS.path;
const formInputsPath = APP_ROUTES.PRIVATE_COMPONENTS_MOLECULES_FORM_INPUTS.path;

const componentsData: Record<string, { title: string; path: Route }[]> = {
  Atoms: [
    { title: "Buttons", path: buttonPath },
    { title: "Text", path: textPath },
    { title: "Inputs", path: inputsPath },
  ],
  Molecules: [
    { title: "Form Inputs", path: formInputsPath },

  ],
  Pages: [{ title: "Teste Um", path: testeUmPath }],
};

export default function ComponentsIndex() {
  const router = useRouter();

  return (
    <PrivateRouteTemplate>
      <Text
        action="primary"
        variant="h1_small"
        weight="bold"
        style={{ textAlign: "center" }}
      >
        Componentes
      </Text>
      

      {Object.entries(componentsData).map(([category, components]) => (
        <View key={category} style={styles.section}>
          <Text action="neutral" variant="paragraph_large_18" weight="bold">
            {category}
          </Text>
          <FlatList
            data={components}
            keyExtractor={(item) => item.path}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.buttonContainer}>
                <Button.Root
                  action="primary"
                  variant="md"
                  onPress={() => router.push(item.path)}
                >
                  <Button.Text>{item.title}</Button.Text>
                </Button.Root>
              </View>
            )}
          />
        </View>
      ))}
    </PrivateRouteTemplate>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    gap: 10,
  },

  buttonContainer: {
    marginRight: 10,
    width: 150,
  },
});
