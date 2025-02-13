import { APP_ROUTES } from "@/src/routes/routes";
import { Redirect, Tabs } from "expo-router";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Theme } from "@/src/styles/theme.style";
import Icon from "@/src/components/atom/icon/Icon";
import Text from "@/src/components/atom/text/Text";
import { canUserAccessPage } from "@/src/routes/routePermissions/routePermission";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import NotFoundScreen from "@/src/components/organism/Error/privatePage/NotFound";
import TabBar from "@/src/components/organism/tabBar/TabBar";

const routeRoot = APP_ROUTES.PRIVATE_ROOT;
const routeProfile = APP_ROUTES.PRIVATE_PROFILE;

export default function PrivateLayout() {
  const { user, permissions, isAuthenticated } = useAuthAppwrite();

  if (!isAuthenticated) {
    return <Redirect href="/signIn" />;
  }
  const canAccessRouteRoot = canUserAccessPage(routeRoot, user, permissions);

  if (!canAccessRouteRoot) {
    return <NotFoundScreen />;
  }

  return (
    <TabBar
      screens={[
        {
          name: routeRoot.name,
          redirect: !canAccessRouteRoot,
          options: {
            title: "Home",
            headerShown: false
          },
          
        },
        {
          name: "components",
          iconProps: {
            name: "widgets",
            family: "Material",
          },
          options: {
            title: "Components",
            headerShown: false
          },
        },
        {
          name: routeProfile.name,
          iconProps: {
            name: "settings",
            family: "Material",
          },
          options: {
            title: "Profile",
            headerShown: false
          },
        },
      ]}
    />
  );
}
