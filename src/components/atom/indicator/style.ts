import { StyleSheet } from "react-native";
import { BaseTheme } from "@/src/styles/theme.style";
import { useTheme } from "@/src/providers/ThemeProvider";
import { scaleSize } from "@/src/styles/mixing.style";

type IndicatorVariant = "sm" | "md" | "lg" | "xxl";
type IndicatorAction = "default"| "defaultInverted" | "primary"

const indicatorSizeMap: { [key in IndicatorVariant]: number } = {
    sm: scaleSize(24),
    md: scaleSize(26),
    lg: scaleSize(28),
    xxl: scaleSize(80),
  };

const colorMap : Record<IndicatorAction, (theme: BaseTheme) => string> = {
    default: (theme: BaseTheme) => theme.colors.neutral.neutral_default,
    defaultInverted: (theme: BaseTheme) => theme.colors.neutral.neutral_default,
    primary: (theme: BaseTheme) => theme.colors.primary.primary_default,
}

type IndicatorStylesProps = {       
    action: IndicatorAction;
    variant: IndicatorVariant;
}

const useIndicatorStyles = ({action, variant}: IndicatorStylesProps) => {
    const { theme } = useTheme();
    return StyleSheet.create({
        indicator: {
            color: colorMap[action](theme),
            fontSize: indicatorSizeMap[variant],
        },
    });
}

export { IndicatorVariant, IndicatorAction };

export default useIndicatorStyles;