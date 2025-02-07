import { KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, View } from "react-native";

import { useState } from "react";
import Input from "@/src/components/atom/input/Input";

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
  return (
    <KeyboardAvoidingView
    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
 

       <Input.Root  variant="lg">
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
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>



  );
}
