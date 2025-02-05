import { View } from "react-native";
import Input from "@/src/components/atom/input/Input";
import { useState } from "react";
import Text from "@/src/components/atom/text/Text";
const TextInput = () => {
  const [text, setText] = useState("Teste");
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text variant="label_medium_16">Teste</Text>
    <Input.Root variant="md" fullWidth>
  
      <Input.Text value={text} onChangeText={setText} />
    </Input.Root>

    </View>
  );

};

export default function InputsPage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput />
    </View>
  );
}
