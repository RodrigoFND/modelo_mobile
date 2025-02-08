import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useState } from "react";
import Input from "@/src/components/atom/input";
import Icon from "@/src/components/atom/icon/Icon";
import FormInputRootTeste from "@/src/components/molecule/form/form-input/root/FormInputRoot";
import FormInputIcon from "@/src/components/molecule/form/form-input/FormInputIcon";
import FormInput from "@/src/components/molecule/form/form-input";

const TextInput = () => {
  const [text, setText] = useState("Teste");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Input.Root variant="md">
        <Input.Content value={text} onChangeText={setText} />
      </Input.Root>
    </View>
  );
};

export default function InputsPage() {
  const [text, setText] = useState("Teste");
  const [number, setNumber] = useState(0);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/*     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
 

       <Input.Root  variant="lg">
       <Icon name="user" size={30} color="black" />

        <Input.Content placeholder="lg"  value={text} onChangeText={setText} />
      </Input.Root>
      <Input.Root  variant="md">
        <Input.Content placeholder="md"  value={text} onChangeText={setText} />
      </Input.Root>
      <Input.Root  variant="md" error={true}>
        <Input.Content placeholder="error"   value={text} onChangeText={setText} />
      </Input.Root>
      <Input.Root  variant="md" editable = {false} >
        <Input.Content placeholder="disabled"   value={text} onChangeText={setText} />
      </Input.Root>
    </View> */}

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Input.Root variant="lg">
            <Input.Content
              placeholder="lg"
              value={text}
              onChangeText={setText}
            />
          </Input.Root>

          <FormInput.Root
            variant="lg"
            errorMessage="Nao foi possivel encontrar o arquivo"
            editable={true}
            labelText="Usuario"
            required={true}
          >
            <FormInput.Icon name="user" />
            <FormInput.Content.Email  />
          </FormInput.Root>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
