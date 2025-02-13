import { StyleSheet } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider";
import { fontsFamily, fontSizes } from "@/src/styles/tokens/fonts.style";
import { NestedKeys, generateMappedProperties } from "@/src/utils/types/types";
import { BaseTheme, Theme } from "@/src/styles/theme.style";

type TextVariants = keyof typeof fontSizes;
type TextFamily = keyof typeof fontsFamily;
type TextWeight = keyof (typeof fontsFamily)[TextFamily];
type TextAction = NestedKeys<typeof Theme.mapped.text>;
/* 
const mappedText = generateMappedProperties(Theme.mapped.text);
console.log(mappedText)

 */

const mappedText: Record<TextAction, (theme: BaseTheme) => string> = {
  "active.default": (theme: BaseTheme) => theme.mapped.text.active.default,
  default: (theme: BaseTheme) => theme.mapped.text.default,
  defaultInverted: (theme: BaseTheme) => theme.mapped.text.defaultInverted,
  neutral: (theme: BaseTheme) => theme.mapped.text.neutral,
  primary: (theme: BaseTheme) => theme.mapped.text.primary,
  primaryInverted: (theme: BaseTheme) => theme.mapped.text.primaryInverted,
  secondary: (theme: BaseTheme) => theme.mapped.text.secondary,
  warning: (theme: BaseTheme) => theme.mapped.text.warning,
  danger: (theme: BaseTheme) => theme.mapped.text.danger,
  disabled: (theme: BaseTheme) => theme.mapped.text.disabled,
  "on.default": (theme: BaseTheme) => theme.mapped.text.on.default,
  "on.defaultInverted": (theme: BaseTheme) =>
    theme.mapped.text.on.defaultInverted,
  "on.neutral": (theme: BaseTheme) => theme.mapped.text.on.neutral,
  "on.primary": (theme: BaseTheme) => theme.mapped.text.on.primary,
  "on.primaryInverted": (theme: BaseTheme) =>
    theme.mapped.text.on.primaryInverted,
  "on.secondary": (theme: BaseTheme) => theme.mapped.text.on.secondary,
  "on.warning": (theme: BaseTheme) => theme.mapped.text.on.warning,
  "on.danger": (theme: BaseTheme) => theme.mapped.text.on.danger,
  "on.disabled": (theme: BaseTheme) => theme.mapped.text.on.disabled,
};

interface TextStyles {
  variant: TextVariants;
  family: TextFamily;
  weight: TextWeight;
  action: TextAction;
}

const useTextStyles = (textStyles: TextStyles) => {
  const { theme } = useTheme();
  return StyleSheet.create({
    text: {
      fontFamily: theme.fontFamily[textStyles.family][textStyles.weight],
      fontSize: fontSizes[textStyles.variant].size,
      lineHeight: fontSizes[textStyles.variant].lineHeight,
      letterSpacing: fontSizes[textStyles.variant].letterSpacing,
      color: mappedText[textStyles.action](theme),
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
};

export type { TextVariants, TextFamily, TextWeight, TextAction };
export default useTextStyles;
