import { usePathname, useRouter, useSegments } from "expo-router";
import { View, Text, StyleSheet, FlatList } from "react-native";


/* const buttonVariants : { [key in ButtonVariants]: string } = {
  sm: "sm",
  md: "md",
  lg: "lg",

};

const buttonActions : { [key in ButtonActions]: string } = {
  default: "default",
  defaultInverted: "defaultInverted",
  primary: "primary",
  secondary: "secondary",
  warning: "warning",
  danger: "danger",
}; */

/* const buttonData = Object.entries(buttonVariants).flatMap(([variantKey, variant]) =>
  Object.entries(buttonActions).map(([actionKey, action]) => ({
    variant,
    action,
    label: `${actionKey} - ${variantKey}`,
  }))
);
 */
export default function ButtonsPage() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exemplo de Botões</Text>

 {/*      <FlatList
        data={buttonData}
        keyExtractor={(item) => `${item.variant}-${item.action}`}
        renderItem={({ item }) => (
          <View style={styles.buttonWrapper}>
            <Button.Root variant={item.variant as ButtonVariants} action={item.action as ButtonActions}>
              {item.label}
            </Button.Root>
          </View>


        )}
        numColumns={1} // Pode ser ajustado se quiser organizar melhor
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
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
    color: "#6200ea",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonWrapper: {
    marginBottom: 10,
    alignItems: "center",
  },
});
