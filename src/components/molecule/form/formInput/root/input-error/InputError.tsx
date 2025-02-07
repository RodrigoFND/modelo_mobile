import { useFormInputContext } from "@/src/components/molecule/form/formInput/FormInputContext";
import { FormInputVariants } from "@/src/components/molecule/form/formInput/FormInput.model";
import { TextVariants } from "@/src/components/atom/text/Text.style";
import Text from "@/src/components/atom/text/Text";
import useFormInputErrorStyles from "./inputError.style";

import { View } from "react-native";


const statusMap: Record<FormInputVariants, TextVariants> = {
  md: "paragraph_small_14",
  lg: "paragraph_medium_16",
} as const;


const InputError = () => {
  const { errorMessage, variant } = useFormInputContext();
  const textVariant = statusMap[variant];
  const styles = useFormInputErrorStyles();
  return (
    <View style={styles.errorContainer}>
      <Text variant={textVariant} style={styles.error}>
        {errorMessage}
      </Text>
    </View>
  );
};

export default InputError;
