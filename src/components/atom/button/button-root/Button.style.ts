import { StyleSheet } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider";
import { ButtonAlignments, ButtonBorder, ButtonVariants, ButtonType, ButtonActions } from "../Button.model";
import { BaseTheme } from "@/src/styles/theme.style";
import { scaleSize } from "@/src/styles/mixing.style";

type ButtonStyles = {
  type: ButtonType;
  action: ButtonActions;
  variant: ButtonVariants;
  alignHorizontal: ButtonAlignments;
  shape: ButtonBorder;
  full: boolean;
  disabled: boolean;
};

const buttonSizes: { [key in ButtonVariants]: { width: number; height: number; paddingHorizontal: number; paddingVertical: number } } = {
  sm: { width: scaleSize(44), height: scaleSize(44), paddingHorizontal: scaleSize(12), paddingVertical: scaleSize(12) },
  md: { width: scaleSize(54), height: scaleSize(54), paddingHorizontal: scaleSize(16), paddingVertical: scaleSize(16) },
  lg: { width: scaleSize(64), height: scaleSize(64), paddingHorizontal: scaleSize(20), paddingVertical: scaleSize(20) },
};

const buttonAlignments: { [key in ButtonAlignments]: "flex-start" | "center" | "flex-end" } = {
  "flex-start": "flex-start",
  center: "center",
  "flex-end": "flex-end",
};

const buttonBorderShapes: { [key in ButtonBorder]: number } = {
  full: 9999,
  semiSquare: 14,
};

const backgroundColorMap: { 
  [key in ButtonType]: { 
    [key in ButtonActions]: (theme: BaseTheme, disabled: boolean) => string 
  }
} = {
  default: {
    default: (theme, disabled) => disabled ? theme.mapped.surface.disabled : theme.mapped.surface.default,
    defaultInverted: (theme, disabled) => disabled ? theme.mapped.surface.disabled : theme.mapped.surface.defaultInverted,
    primary: (theme, disabled) => disabled ? theme.mapped.surface.disabled : theme.mapped.surface.primary,
    secondary: (theme, disabled) => disabled ? theme.mapped.surface.disabled : theme.mapped.surface.secondary,
    warning: (theme, disabled) => disabled ? theme.mapped.surface.disabled : theme.mapped.surface.warning,
    danger: (theme, disabled) => disabled ? theme.mapped.surface.disabled : theme.mapped.surface.danger,
  },
  outline: {
    default: (theme, disabled) => disabled ? theme.mapped.surface.disabled : 'transparent',
    defaultInverted: (theme, disabled) => disabled ? theme.mapped.surface.disabled : 'transparent',
    primary: (theme, disabled) => disabled ? theme.mapped.surface.disabled : 'transparent',
    secondary: (theme, disabled) => disabled ? theme.mapped.surface.disabled : 'transparent',
    warning: (theme, disabled) => disabled ? theme.mapped.surface.disabled : 'transparent',
    danger: (theme, disabled) => disabled ? theme.mapped.surface.disabled : 'transparent',
  },
};

const borderColorMap: {
  [key in ButtonType]: { 
    [key in ButtonActions]: (theme: BaseTheme) => string | undefined 
  }
} = {
  default: {
    default: () => undefined,
    defaultInverted: () => undefined,
    primary: () => undefined,
    secondary: () => undefined,
    warning: () => undefined,
    danger: () => undefined,
  },
  outline: {
    default: theme => theme.mapped.surface.default,
    defaultInverted: theme => theme.mapped.surface.defaultInverted,
    primary: theme => theme.mapped.surface.primary,
    secondary: theme => theme.mapped.surface.secondary,
    warning: theme => theme.mapped.surface.warning,
    danger: theme => theme.mapped.surface.danger,
  },
};

export const useButtonStyles = (buttonStyles: ButtonStyles) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    button: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: buttonAlignments[buttonStyles.alignHorizontal],
      gap: theme.spacing.s_8,
      backgroundColor: backgroundColorMap[buttonStyles.type][buttonStyles.action](theme, buttonStyles.disabled),
      minWidth: buttonStyles.full ? "100%" : buttonSizes[buttonStyles.variant].width,
      minHeight: buttonSizes[buttonStyles.variant].height,
      paddingVertical: buttonSizes[buttonStyles.variant].paddingVertical,
      paddingHorizontal: buttonSizes[buttonStyles.variant].paddingHorizontal,
      borderRadius: buttonBorderShapes[buttonStyles.shape],
      borderWidth: buttonStyles.type === 'outline' ? 1 : 0,
      borderColor: borderColorMap[buttonStyles.type][buttonStyles.action](theme),
    },
  });
};

/* 
type ButtonAlignment = 'flex-start' | 'center' | 'flex-end';

type ButtonShape = 'semiSquare' | 'semiRounded';

type ButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ButtonVariants = 'primary' | 'secondary' | 'warning' | 'neutral' | 'light' | 'transparent' | 'danger' | 'black';

const ButtonAlignment: { [key in ButtonAlignment]: ButtonAlignment } = {
  'flex-start': 'flex-start',
  center: 'center',
  'flex-end': 'flex-end',
};



const useButtonStyles = (buttonStyles: {
  size: ButtonSizes;
  variant: ButtonVariants;
  alignHorizontal: ButtonAlignment;
  shape: ButtonShape;
  full: boolean;
  disabled: boolean;
}) => {
  const { theme } = useTheme();

  const buttonSizes = {
    xs: {
      width: 44,
      height: 44,
      normalizedVerticalPadding: theme.spacing.size_4,
      normalizedHorizontalPadding: theme.spacing.size_20,
    },
    sm: {
      width: 44,
      height: 44,
      normalizedVerticalPadding: theme.spacing.size_4,
      normalizedHorizontalPadding: theme.spacing.size_12,
    },
    md: {
      width: 54,
      height: 54,
      normalizedVerticalPadding: theme.spacing.size_8,
      normalizedHorizontalPadding: theme.spacing.size_16,
    },
    lg: {
      width: 64,
      height: 64,
      normalizedVerticalPadding: theme.spacing.size_12,
      normalizedHorizontalPadding: theme.spacing.size_20,
    },
    xl: {
      width: 64,
      height: 64,
      normalizedVerticalPadding: theme.spacing.size_12,
      normalizedHorizontalPadding: theme.spacing.size_20,
    },
  };

  const buttonColors = {
    primary: theme.colors.primary_900,
    secondary: `${theme.colors.primary_500}4D`,
    warning: theme.colors.warning,
    neutral: `${theme.colors.neutral_100}4D`,
    light: theme.colors.white,
    transparent: 'transparent',
    danger: theme.colors.danger,
    black: theme.colors.black,
  };

  const normalizedButtonShapeRadius = {
    semiSquare: theme.borderRadius.b_15,
    semiRounded: theme.borderRadius.b_30,
  };

  const { width, height, normalizedVerticalPadding, normalizedHorizontalPadding } =
    buttonSizes[buttonStyles.size];
  const buttonBackGroundColor = buttonColors[buttonStyles.variant];

  return StyleSheet.create({
    button: {
      position: 'relative',
      width: buttonStyles.full ? '100%' : scaleSize(width),
      height: scaleSize(height),
      borderRadius: normalizedButtonShapeRadius[buttonStyles.shape],
      backgroundColor: buttonStyles.disabled
        ? theme.colors.neutral_350
        : buttonBackGroundColor,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: ButtonAlignment[buttonStyles.alignHorizontal],
      gap: theme.spacing.size_8,
      paddingHorizontal: normalizedHorizontalPadding,
      paddingVertical: normalizedVerticalPadding,
    },
  });
};

export { ButtonAlignment, useButtonStyles };
 */
