import { StyleSheet } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider";
import { fontsFamily, fontSizes } from "@/src/styles/tokens/fonts.style";

type TextVariants = keyof typeof fontSizes;
type TextFamily = keyof typeof fontsFamily;
type TextWeight = keyof (typeof fontsFamily)[TextFamily];

interface TextStyles {
  variant: TextVariants;
  family: TextFamily;
  weight: TextWeight;
}

const useTextStyles = (textStyles: TextStyles) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    text: {
      fontFamily: theme.fontFamily[textStyles.family][textStyles.weight],
      fontSize: fontSizes[textStyles.variant].size,
      lineHeight: fontSizes[textStyles.variant].lineHeight,
      letterSpacing: fontSizes[textStyles.variant].letterSpacing,
      color: theme.mapped.text.defaultInverted,
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
  });
};

export type { TextVariants, TextFamily, TextWeight };
export default useTextStyles;
