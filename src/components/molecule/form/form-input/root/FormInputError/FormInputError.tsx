import React from "react";
import { View } from "react-native";
import Text from "@/src/components/atom/text/Text";
import { TextVariants } from "@/src/components/atom/text/Text.style";
import useFormInputErrorStyles from "./style";

const statusMap: Record<FormInputVariants, TextVariants> = {
  md: "paragraph_small_14",
  lg: "paragraph_medium_16",
} as const;

interface FormInputErrorProps {
  errorMessage: string;
  variant: FormInputVariants;
}

const FormInputError = ({
  errorMessage,
  variant,
}: FormInputErrorProps) => {
  const textVariant = statusMap[variant];
  const styles = useFormInputErrorStyles();
  return (
    <>
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text variant={textVariant} action="danger">
            {errorMessage}
          </Text>
        </View>
      )}
    </>
  );
};

export default FormInputError;
