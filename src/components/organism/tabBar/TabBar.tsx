import { Tabs } from "expo-router";
import Icon, { IconProps } from "@/src/components/atom/icon/Icon";
import Text from "../../atom/text/Text";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useTheme } from "@/src/providers/ThemeProvider";
type TabScreenProps = React.ComponentProps<typeof Tabs.Screen> & {
  iconProps?: Omit<IconProps, "action" | "variant">; // Props do ícone dentro da aba
};

type TabBarProps = React.ComponentProps<typeof Tabs> & {
  screens: (Omit<TabScreenProps, "children"> & TabScreenProps)[]; // Adiciona nome do ícone
};

export const TabBar = ({ screenOptions, screens, ...props }: TabBarProps) => {
  const { theme } = useTheme();
  const defaultScreenOptions : BottomTabNavigationOptions  = {
    tabBarLabel: ({ focused, children }: { focused: boolean, children: React.ReactNode }) => (
      <Text variant="label_medium_16" action={focused ? "primary" : "on.default"}>
        {children}
      </Text>
    ),
  };

  return (
    <Tabs
      screenOptions={{
        ...defaultScreenOptions,
        ...screenOptions,
        animation: "fade", // Altera a animação de transição (pode testar "slide_from_right")
     
        tabBarStyle: {
          backgroundColor: theme.mapped.surface.default,
        },

      }}
      {...props}
    >
      {screens.map(({ iconProps, ...screen }) => (
        <Tabs.Screen
          key={screen.name}
          {...screen}
          options={{
            ...screen.options,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={iconProps?.name || "home"}
                family={iconProps?.family || "Material"}
                action={focused ? "primary" : "defaultInverted"}
                variant="md"
                {...iconProps}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabBar;
