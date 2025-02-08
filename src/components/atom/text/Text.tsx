import { TextProps, Text as RNText } from "react-native";
import useTextStyles, {
  TextAction,
  TextFamily,
  TextVariants,
  TextWeight,
} from "./Text.style";

interface TextStyles extends TextProps {
  variant?: TextVariants;
  family?: TextFamily;
  weight?: TextWeight;
  action?: TextAction;
}

const Text: React.FC<TextStyles> = ({
  children,
  variant = "paragraph_medium_16",
  family = "primary",
  weight = "regular",
  action = "on.default",
  style,
  ...props
}) => {
  const styles = useTextStyles({ variant, family, weight, action });
  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
