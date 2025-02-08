import React from "react";
import Input from "@/src/components/atom/input";
import { InputContentProps } from "@/src/components/atom/input/content/InputContent";
import { TextInput } from "react-native";

type FormInputTextProps = Omit<
  InputContentProps,
  "textContentType" | "autoComplete" | "importantForAutofill"
>;

const FormInputText = React.forwardRef<TextInput, FormInputTextProps>(
  (props, ref) => {
    return (
      <Input.Content ref={ref} placeholder="Example@email.com" {...props} />
    );
  }
);

export default FormInputText;
