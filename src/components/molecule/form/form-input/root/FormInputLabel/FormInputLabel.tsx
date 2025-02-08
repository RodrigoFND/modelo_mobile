import React from "react";
import Label, { LabelProps } from "@/src/components/atom/label/Label";
import { View } from "react-native";
import useFormInputLabelStyles from "./style";

interface FormInputLabelProps extends LabelProps {}

const FormInputLabel = ({
  children,
  labelExtraContent,
  required,
  variant,
}: FormInputLabelProps) => {
  const styles = useFormInputLabelStyles();
  
  return (
    <>
      {children && (
        <View style={styles.labelContainer}>
          <Label
            labelExtraContent={labelExtraContent}
            required={required}
            variant={variant}
          >
            {children}
          </Label>
        </View>
      )}
    </>
  );
};

export default FormInputLabel;
