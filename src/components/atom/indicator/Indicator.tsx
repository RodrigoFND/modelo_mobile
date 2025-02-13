import { memo, ComponentType } from "react";
import { ViewStyle, StyleProp, ActivityIndicator } from "react-native";
import * as Progress from "react-native-progress";
import useIndicatorStyles, { IndicatorVariant, IndicatorAction } from "./style";

type IndicatorName = "default" | "progress" | "circle";

export interface IndicatorProps {
  name?: IndicatorName;
  variant?: IndicatorVariant;
  action?: IndicatorAction;
  style?: StyleProp<ViewStyle>;
}

// Mapeia os componentes para facilitar o uso dinâmico
const indicatorMap: Record<IndicatorName, ComponentType<any>> = {
  default: ActivityIndicator,
  progress: Progress.CircleSnail, // Alterado para um spinner animado
  circle: Progress.Circle,
};

const Indicator = memo(({ name = "default", variant = "md", action = "default", style }: IndicatorProps) => {
  const IndicatorComponent = indicatorMap[name]; // Agora TypeScript sabe que isso é um componente válido
  const indicatorStyles = useIndicatorStyles({ action, variant });

  const commonProps = {
    color: indicatorStyles.indicator.color,
    size: indicatorStyles.indicator.fontSize,
    style,
  };

  return <IndicatorComponent {...commonProps}/>;
});

Indicator.displayName = "Indicator";

export default Indicator;
