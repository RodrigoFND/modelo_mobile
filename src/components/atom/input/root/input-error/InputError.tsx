import { useInputContext } from "@/src/components/atom/input/InputContext";
import { InputVariants } from "@/src/components/atom/input/Input.model";
import { TextVariants } from "@/src/components/atom/text/Text.style";
import Text from "@/src/components/atom/text/Text";
import useInputErrorStyles from "./inputError.style";
import { View } from "react-native";

const statusMap: Record<InputVariants, TextVariants> = {
  md: "paragraph_small_14",
  lg: "paragraph_medium_16",
} as const;

const InputError = () => {
  const { errorMessage, variant } = useInputContext();
  const textVariant = statusMap[variant];
  const styles = useInputErrorStyles();
  return (
    <View style={styles.errorContainer}>
      <Text variant={textVariant} style={styles.error}>
        {errorMessage}
      </Text>
    </View>
  );
};

export default InputError;
