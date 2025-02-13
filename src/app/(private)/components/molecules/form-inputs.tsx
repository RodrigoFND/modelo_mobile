import FormInput from "@/src/components/molecule/form/form-input";
import PrivateRouteTemplate from "@/src/components/template/PrivateRouteTemplate";
import { useState } from "react";
import { View } from "react-native";

const NumberInput = () => {
  const [value, setValue] = useState(0);
  return (
    <FormInput.Root labelText="Number Input">
      <FormInput.Content.Number value={value} onChangeNumber={setValue} />
    </FormInput.Root>
  );
};

const TextInput = () => {
  const [value, setValue] = useState("");
  return (
    <FormInput.Root labelText="Text Input">
      <FormInput.Content.Text value={value} onChangeText={setValue} />
    </FormInput.Root>
  );
};

const EmailInput = () => {
  const [value, setValue] = useState("");
  return (
    <FormInput.Root labelText="Email Input">
      <FormInput.Content.Email value={value} onChangeText={setValue} />
      <FormInput.Icon name="mail" family="Feather" />
    </FormInput.Root>
  );
};
export default function FormInputsPage() {
  return (
    <PrivateRouteTemplate viewStyle={{ gap: 20 }}>
      <NumberInput />
      <TextInput />
      <EmailInput />
    </PrivateRouteTemplate>
  );
}
