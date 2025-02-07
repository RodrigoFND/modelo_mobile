import Label from "@/src/components/atom/label/Label";
import { useFormInputContext } from "@/src/components/molecule/form/formInput/FormInputContext";
import { View } from "react-native";
import { useFormInputLabelStyles } from "./FormInputLabel.style";


const FormInputLabel = () => {
  const { label, variant, required, status } = useFormInputContext();
  const styles = useFormInputLabelStyles();
  if (!label) return null;

  return (
    <View style={styles.labelContainer}>
      <Label 
        variant={variant} 
        status={status == 'disabled' ? 'default' : status} 
        required={required}
      >
        {label}
      </Label>
    </View>
  );
};

export default FormInputLabel;
