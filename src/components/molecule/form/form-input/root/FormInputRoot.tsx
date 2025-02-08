import Input from "@/src/components/atom/input";
import { View } from "react-native";
import { InputVariants } from "@/src/components/atom/input/Input.model";
import FormInputLabel from "./FormInputLabel/FormInputLabel";
import useFormInputRootStyles from "./style";
import FormInputError from "./FormInputError/FormInputError";

interface FormInputRootProps {
  variant?: InputVariants;
  children: React.ReactNode;
  editable?: boolean;
  errorMessage?: string;
  labelText?: React.ReactNode;
  labelExtraContent?: React.ReactNode;
  required?: boolean;
}

const FormInputRoot: React.FC<FormInputRootProps> = ({
  children,
  variant = "md",
  errorMessage = "",
  labelText = "",
  labelExtraContent = "",
  editable = true,
  required = false,
  ...props
}) => {
  const styles = useFormInputRootStyles();
  return (
    <View style={styles.rootContainer}>
      <FormInputLabel
        labelExtraContent={labelExtraContent}
        required={required}
        variant={variant}
      >
        {labelText}
      </FormInputLabel>
      <Input.Root
        variant={variant}
        error={Boolean(errorMessage)}
        editable={editable}
        {...props}
      >
        <View style={styles.inputContainer}>{children}</View>
      </Input.Root>

      <FormInputError errorMessage={errorMessage} variant={variant} />
    </View>
  );
};

export default FormInputRoot;
