import { useTheme } from "@/src/providers/ThemeProvider";
import { StyleSheet } from "react-native";

const useFormInputLabelStyles = () => {
    const { theme } = useTheme();
    return StyleSheet.create({
        labelContainer: { 
            marginBottom: theme.spacing.s_4
        },
    })
}


export default useFormInputLabelStyles;

