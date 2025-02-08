import React from "react";
import Input from "@/src/components/atom/input";
import { InputContentProps } from "@/src/components/atom/input/content/InputContent";
import { TextInput } from "react-native";

interface FormInputTextTesteProps extends InputContentProps {}

const FormInputTextTeste = React.forwardRef<TextInput, FormInputTextTesteProps>(
  (props, ref) => {
    return <Input.Content ref={ref} placeholder="Insera o texto" {...props} />;
  }
);

export default FormInputTextTeste;
