import { StyleSheet } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider";
import { ButtonFontFamily, ButtonActions, ButtonVariants, ButtonType } from "../Button.model";
import { BaseTheme } from "@/src/styles/theme.style";

type ButtonTextStyles = {
  action: ButtonActions;
  type: ButtonType;
  variant: ButtonVariants;
  fontFamily: ButtonFontFamily;
};


const textColorMap: { [key in ButtonType]: { [key in ButtonActions]: (theme: BaseTheme) => string } } = {
  default: {
    default: (theme: BaseTheme) => theme.mapped.text.on.default,
    defaultInverted: (theme: BaseTheme) => theme.mapped.text.on.defaultInverted,
    primary: (theme: BaseTheme) => theme.mapped.text.on.primary,
    secondary: (theme: BaseTheme) => theme.mapped.text.on.secondary,
    warning: (theme: BaseTheme) => theme.mapped.text.on.warning,
    danger: (theme: BaseTheme) => theme.mapped.text.on.danger,
  },
  outline: {
    default: (theme: BaseTheme) => theme.mapped.text.default,
    defaultInverted: (theme: BaseTheme) => theme.mapped.text.defaultInverted,
    primary: (theme: BaseTheme) => theme.mapped.text.primary,
    secondary: (theme: BaseTheme) => theme.mapped.text.secondary,
    warning: (theme: BaseTheme) => theme.mapped.text.warning,
    danger: (theme: BaseTheme) => theme.mapped.text.danger,
  },
};

const fontSizeMap: { [key in ButtonVariants]: (theme: BaseTheme) => {size: number, lineHeight: number, letterSpacing: number} } = {
  sm: (theme: BaseTheme) => theme.fontSizes.label_small_14,
  md: (theme: BaseTheme) => theme.fontSizes.label_medium_16,
  lg: (theme: BaseTheme) => theme.fontSizes.label_large_18,
};


export const useButtonTextStyles = (buttonTextStyles: ButtonTextStyles) => {
  const { theme } = useTheme();


  return StyleSheet.create({
    buttonText: {
      color: textColorMap[buttonTextStyles.type][buttonTextStyles.action](theme),
      fontFamily: theme.fontFamily[buttonTextStyles.fontFamily]['semiBold'],
      fontSize: fontSizeMap[buttonTextStyles.variant](theme).size,
      lineHeight: fontSizeMap[buttonTextStyles.variant](theme).lineHeight,
      letterSpacing: fontSizeMap[buttonTextStyles.variant](theme).letterSpacing,
      includeFontPadding: false,
      textAlign: "center",
    },
  });
};
