import { TextProps } from "react-native";
import Text from "../text/Text";
import useLabelStyles, { LabelStatus, LabelVariants } from "./Label.style";

export interface LabelProps extends TextProps {
    status?: LabelStatus;
    variant?: LabelVariants;
    labelExtraContent?: React.ReactNode;
    required?: boolean;
}

const Label : React.FC<LabelProps> = ({children, variant = 'md', status = 'default', labelExtraContent, required = false, style, ...props}) => {
    const labelStyles = useLabelStyles({variant: variant, status: status});
    return (
        <Text style={[labelStyles.label, style]} {...props}>
            {children} 
            {required && <Text style={labelStyles.asterisk} >* </Text>}
             {labelExtraContent}
        </Text>
    )
}

export default Label;
