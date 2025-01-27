import { TextProps,Text as RNText  } from "react-native";
import useTextStyles, { TextFamily, TextVariants, TextWeight } from "./Text.style";

interface TextStyles extends TextProps {
    variant?: TextVariants;
    family?: TextFamily;
    weight?: TextWeight;
}

const Text : React.FC<TextStyles> = ({children, variant = 'paragraph_medium_16', family = 'primary', weight = 'regular', style, ...props}) => {
    const styles = useTextStyles({variant, family, weight});
    return (
        <RNText style={[styles.text, style]} {...props}>
            {children}
        </RNText>
    )
}

export default Text;