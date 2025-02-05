import { APP_ROUTES } from "@/src/routes/routes";
import { Redirect, Tabs } from "expo-router";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Theme } from "@/src/styles/theme.style";
import Icon from "@/src/components/atom/icon/Icon";
import Text from "@/src/components/atom/text/Text";
import { canUserAccessPage } from "@/src/routes/routePermissions/routePermission";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import NotFoundScreen from "@/src/components/organism/Error/privatePage/NotFound";


const routeRoot = APP_ROUTES.PRIVATE_ROOT;

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
    <Tabs
      screenOptions={{
        tabBarLabel: ({ focused, children }) => {
          return (
            <Text
              variant="label_medium_16"
              style={{
                color: focused
                  ? Theme.colors.primary.primary_default
                  : Theme.colors.neutral.neutral_400,
              }}
            >
              {children}
            </Text>
          );
        },
      }}
    >
      <Tabs.Screen
        name={"index"}
        redirect={!canAccessRouteRoot}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="home"
                style={{
                  color: focused
                    ? Theme.colors.primary.primary_default
                    : Theme.colors.neutral.neutral_400,
                }}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name={"components"}
        options={{
          title: "Components",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="widgets"
                family="Material"
                style={{
                  color: focused
                    ? Theme.colors.primary.primary_default
                    : Theme.colors.neutral.neutral_400,
                }}
              />
            );
          },
        }}
      />
      {/*        <Tabs.Screen
        name={'components/atoms'}
        options={{
      
        }}
      />
 */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.primary.primary_default,
    marginTop: 10,
  },
  tabBar: {
    backgroundColor: Theme.colors.neutral.neutral_100,
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },

    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.neutral.neutral_100,
  },
  tabIndicator: {
    backgroundColor: Theme.colors.neutral.neutral_100,
    height: 3,
  },
});
