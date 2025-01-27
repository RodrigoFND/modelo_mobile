import { StyleSheet } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider";
import { ButtonActions, ButtonVariants, ButtonType } from "../Button.model";
import { BaseTheme } from "@/src/styles/theme.style";
import { scaleSize } from "@/src/styles/mixing.style";

type ButtonIconStyles = {
  action: ButtonActions;
  type: ButtonType;
  variant: ButtonVariants;
};

const iconSizeMap: { [key in ButtonVariants]: number } = {
  sm: scaleSize(24),
  md: scaleSize(28),
  lg: scaleSize(32),
};

const iconColorMap: {
  [key in ButtonType]: {
    [key in ButtonActions]: (theme: BaseTheme) => string;
  };
} = {
  default: {
    default: theme => theme.mapped.text.on.default,
    defaultInverted: theme => theme.mapped.text.on.defaultInverted,
    primary: theme => theme.mapped.text.on.primary,
    secondary: theme => theme.mapped.text.on.secondary,
    warning: theme => theme.mapped.text.on.warning,
    danger: theme => theme.mapped.text.on.danger,
  },
  outline: {
    default: theme => theme.mapped.text.default,
    defaultInverted: theme => theme.mapped.text.defaultInverted,
    primary: theme => theme.mapped.text.primary,
    secondary: theme => theme.mapped.text.secondary,
    warning: theme => theme.mapped.text.warning,
    danger: theme => theme.mapped.text.danger,
  },
};

export const useButtonIconStyles = (buttonIconStyles: ButtonIconStyles) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    buttonIcon: {
      color: iconColorMap[buttonIconStyles.type][buttonIconStyles.action](theme),
      fontSize: iconSizeMap[buttonIconStyles.variant],
    },
  });
};
