import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import { useState } from "react";
import Input from "@/src/components/atom/input";
import PrivateRouteTemplate from "@/src/components/template/PrivateRouteTemplate";

const TextInput = () => {
  const [text, setText] = useState("Input Field");
  return (
    <Input.Root variant="md">
      <Input.Content
        placeholder="InputField"
        value={text}
        onChangeText={setText}
      />
    </Input.Root>
  );
};

export default function InputsPage() {
  return (
    <PrivateRouteTemplate
      viewStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TextInput />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PrivateRouteTemplate>
  );
}
