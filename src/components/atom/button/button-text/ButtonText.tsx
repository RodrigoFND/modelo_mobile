
import { StyleProp, Text, TextStyle, TextProps } from "react-native";
import { useButtonContext } from "../ButtonContext";
import { useButtonTextStyles } from "./ButtonText.style";
import { ButtonFontFamily } from "../Button.model";
interface ButtonTextProps extends TextProps {
    children: React.ReactNode;
    fontFamily?: ButtonFontFamily;
    style?: StyleProp<TextStyle>;

}

 const ButtonText : React.FC<ButtonTextProps> = ({children, fontFamily = 'primary', style, ...props}) => {
    const { action, variant, type } = useButtonContext();
    const buttonTextStyles = useButtonTextStyles({action, variant, fontFamily, type});
    return (
        <Text style={[buttonTextStyles.buttonText, style]} {...props}>
            {children} 
        </Text>
    )
}

export default ButtonText;