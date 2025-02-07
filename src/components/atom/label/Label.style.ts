import { useTheme } from "@/src/providers/ThemeProvider";
import { scaleSize } from "@/src/styles/mixing.style";
import { BaseTheme } from "@/src/styles/theme.style";
import { StyleSheet } from "react-native";


type LabelStatus = 'default' | 'error'
type LabelVariants = 'sm' | 'md' | 'lg';

interface LabelStyles {
    variant: LabelVariants;
    status: LabelStatus;
}

const fontSizeMap: { [key in LabelVariants]: (theme: BaseTheme) => {size: number, lineHeight: number, letterSpacing: number} } = {
    sm: (theme: BaseTheme) => theme.fontSizes.label_small_14,
    md: (theme: BaseTheme) => theme.fontSizes.label_medium_16,
    lg: (theme: BaseTheme) => theme.fontSizes.label_large_18,
  };

const fontColorMap: { [key in LabelStatus]: (theme: BaseTheme) => string } = {
    default: (theme: BaseTheme) => theme.mapped.text.neutral,
    error: (theme: BaseTheme) => theme.mapped.text.danger,
}

const asteriskColorMap: { [key in LabelStatus]: (theme: BaseTheme) => string } = {
    default: (theme: BaseTheme) => theme.mapped.text.danger,
    error: (theme: BaseTheme) => theme.mapped.text.danger,
}

const useLabelStyles = (labelStyles: LabelStyles) => {
    const { theme } = useTheme();
    return StyleSheet.create({
        label: {
            color: fontColorMap[labelStyles.status](theme),
            fontFamily: theme.fontFamily.primary.medium,
            fontSize: fontSizeMap[labelStyles.variant](theme).size,
            lineHeight: fontSizeMap[labelStyles.variant](theme).lineHeight,
            letterSpacing: fontSizeMap[labelStyles.variant](theme).letterSpacing,
        },
        asterisk: {
            color: asteriskColorMap[labelStyles.status](theme),
            fontSize: scaleSize(18),
        }

    })
}

export type { LabelStatus, LabelVariants };

export default useLabelStyles;      