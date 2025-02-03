import { View, Text } from "react-native";

export default function Fallback() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>Fallback</Text>
    </View>
  );
}

