import Input from "@/src/components/atom/input/Input";
import FormInputLabel from "../formInput/root/input-label/FormInputLabel";
import { View } from "react-native";
import {
  InputStatus,
  InputVariants,
} from "@/src/components/atom/input/Input.model";
import Label from "@/src/components/atom/label/Label";

interface FormInputRootProps {
  variant?: InputVariants;
  status?: InputStatus;
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
  return (
    <View style={{ flexDirection: "column", gap: 10 }}>
      <Label
        labelExtraContent={labelExtraContent}
        required={required}
        variant={variant}
      >
        {labelText}
      </Label>
      <Input.Root
        variant={variant}
        error={Boolean(errorMessage)}
        editable={editable}
        {...props}
      >
        <View>{children}</View>
      </Input.Root>
    </View>
  );
};

export default FormInputRoot;
