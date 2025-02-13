import { Stack, Redirect } from "expo-router";
import { APP_ROUTES } from "@/src/routes/routes";
import { canUserAccessPage } from "@/src/routes/routePermissions/routePermission";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";

const routeRoot = APP_ROUTES.PRIVATE_COMPONENTS_ROOT;

const routeAtomsButtons = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_BUTTONS;
const routeAtomsText = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_TEXTS;
const routeAtomsInputs = APP_ROUTES.PRIVATE_COMPONENTS_ATOMS_INPUTS;

const routeFormInputs = APP_ROUTES.PRIVATE_COMPONENTS_MOLECULES_FORM_INPUTS;

const routeTesteUmList = APP_ROUTES.PRIVATE_COMPONENTS_PAGES_TESTEUM_LIST;
const routeTesteUmID = APP_ROUTES.PRIVATE_COMPONENTS_PAGES_TESTEUM_ID;


export default function ComponentsLayout() {
  const { user, permissions } = useAuthAppwrite();
  const canAccessRouteRoot = canUserAccessPage(routeRoot, user, permissions);

  if (!canAccessRouteRoot) {
    return <Redirect href="/(private)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen
        redirect={!canAccessRouteRoot}
        name={routeRoot.name}
        options={{ title: "Components" }}
      />
      <Stack.Screen
        name={routeAtomsButtons.name}
        redirect={!canUserAccessPage(routeAtomsButtons, user, permissions)}
        options={{ title: "Buttons" }}
      />
      <Stack.Screen
        name={routeAtomsText.name}
        redirect={!canUserAccessPage(routeAtomsText, user, permissions)}
        options={{ title: "Text" }}
      />
      <Stack.Screen
        name={routeAtomsInputs.name}
        redirect={!canUserAccessPage(routeAtomsInputs, user, permissions)}
        options={{ title: "Inputs" }}
      />
      <Stack.Screen
        name={routeTesteUmList.name}
        redirect={!canUserAccessPage(routeTesteUmList, user, permissions)}
        options={{ title: "TesteUm" }}
      />
      <Stack.Screen
        name={routeFormInputs.name}
        redirect={!canUserAccessPage(routeFormInputs, user, permissions)}
        options={{ title: "Form Inputs" }}
      />

      <Stack.Screen
        name={routeTesteUmID.name}
        redirect={!canUserAccessPage(routeTesteUmID, user, permissions)}
        options={({ route }: { route: { params?: { id?: string } } }) => {
          return { title: `Id: ${route.params?.id ?? "Desconhecido"}` };
        }}
      />
    </Stack>

  );
}
