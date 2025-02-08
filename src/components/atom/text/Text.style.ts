import { StyleSheet } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider";
import { fontsFamily, fontSizes } from "@/src/styles/tokens/fonts.style";
import { NestedKeys, generateMappedProperties } from "@/src/utils/types/types";
import { Theme } from "@/src/styles/theme.style";


type TextVariants = keyof typeof fontSizes;
type TextFamily = keyof typeof fontsFamily;
type TextWeight = keyof (typeof fontsFamily)[TextFamily];
type TextAction = NestedKeys<typeof Theme.mapped.text>;
const mappedText = generateMappedProperties(Theme.mapped.text);
console.log(mappedText)


  


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
      color: mappedText[textStyles.action],
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
  });
};

export type { TextVariants, TextFamily, TextWeight, TextAction };
export default useTextStyles;
