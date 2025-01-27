import Label from "@/src/components/atom/label/Label";
import { useInputContext } from "@/src/components/atom/input/InputContext";
import { View } from "react-native";
import { useInputLabelStyles } from "./InputLabel.style";

const InputLabel = () => {
  const { label, variant, required, error } = useInputContext();
  const styles = useInputLabelStyles();
  
  if (!label) return null;

  return (
    <View style={styles.labelContainer}>
      <Label 
        variant={variant} 
        status={error ? "error" : "default"} 
        required={required}
      >
        {label}
      </Label>
    </View>
  );
};

export default InputLabel;
