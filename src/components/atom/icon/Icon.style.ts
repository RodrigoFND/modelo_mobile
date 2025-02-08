import { useTheme } from "@/src/providers/ThemeProvider";
import { scaleSize } from "@/src/styles/mixing.style";
import { BaseTheme } from "@/src/styles/theme.style";
import { StyleSheet } from "react-native";

type IconAction = "default" | "defaultInverted" | "primary" | "secondary" | "disabled" | "danger";
type IconVariant = "sm" | "md" | "lg";
type IconFamily =
  | "Feather"
  | "Material"
  | "AntDesign"
  | "FontAwesome"
  | "Ionicons";

const iconSizeMap: { [key in IconVariant]: number } = {
  sm: scaleSize(24),
  md: scaleSize(26),
  lg: scaleSize(28),
};

const iconColorMap: { [key in IconAction]: (theme: BaseTheme) => string } = {
  default: (theme) => theme.mapped.text.default,
  defaultInverted: (theme) => theme.mapped.text.defaultInverted,
  primary: (theme) => theme.mapped.text.primary,
  secondary: (theme) => theme.mapped.text.secondary,
  disabled: (theme) => theme.mapped.text.disabled,
  danger: (theme) => theme.mapped.text.danger,
};

type IconStylesProps = {
    action: IconAction,
    variant: IconVariant
}

const useIconStyles = ({action, variant}: IconStylesProps) => {

  const { theme } = useTheme();
  return StyleSheet.create({
    icon: {
      fontSize: iconSizeMap[variant],
      color: iconColorMap[action](theme),
    },
  });

};
export type { IconAction, IconVariant, IconFamily };
export default useIconStyles;
