import { scaleSize } from "../mixing.style";

export const fontsFamily = {
  primary: {
    regular: "Mulish_400Regular",
    medium: "Mulish_500Medium",
    semiBold: "Mulish_600SemiBold",
    bold: "Mulish_700Bold",
  },
  secondary: {
    regular: "DMSans_400Regular",
    medium: "DMSans_500Medium",
    semiBold: "DMSans_500Medium",
    bold: "DMSans_700Bold",
  },
};

const calculateLetterSpacing = (fontSize: number, percentage: number) => {
  return fontSize * (percentage / 100);
};

const fontsPropertiesSizes = (
  size: number,
  lineHeight: number,
  letterSpacing: number
) => ({
  size: scaleSize(size),
  lineHeight: scaleSize(lineHeight),
  letterSpacing: calculateLetterSpacing(scaleSize(size), letterSpacing),
});

export const fontSizes = {
  h1_display: fontsPropertiesSizes(36, 44, -2),
  h1: fontsPropertiesSizes(36, 44, -2),
  h2: fontsPropertiesSizes(32, 40, -2),
  h3: fontsPropertiesSizes(28, 36, -2),
  h4: fontsPropertiesSizes(24, 32, -2),
  h5: fontsPropertiesSizes(20, 28, -2),
  h6: fontsPropertiesSizes(18, 24, -2),
  h1_display_small: fontsPropertiesSizes(26, 32, -2),
  h1_small: fontsPropertiesSizes(26, 32, -2),
  h2_small: fontsPropertiesSizes(24, 30, -2),
  h3_small: fontsPropertiesSizes(22, 28, -2),
  h4_small: fontsPropertiesSizes(20, 26, -2),
  h5_small: fontsPropertiesSizes(18, 24, -2),
  h6_small: fontsPropertiesSizes(16, 22, -2),
  paragraph_large_18: fontsPropertiesSizes(18, 28, 0),
  paragraph_medium_16: fontsPropertiesSizes(16, 24, 0),
  paragraph_small_14: fontsPropertiesSizes(14, 20, 0),
  paragraph_xsmall_12: fontsPropertiesSizes(12, 20, 0),
  paragraph_overline_large_14: fontsPropertiesSizes(14, 20, 0),
  paragraph_overline_small_12: fontsPropertiesSizes(12, 20, 0),
  label_large_18: fontsPropertiesSizes(18, 20, 0),
  label_medium_16: fontsPropertiesSizes(16, 18, 0),
  label_small_14: fontsPropertiesSizes(14, 16, 0),
  label_xsmall_12: fontsPropertiesSizes(12, 14, 0),
};
