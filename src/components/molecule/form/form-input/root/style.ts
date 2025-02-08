import { useTheme } from "@/src/providers/ThemeProvider";
import { StyleSheet } from "react-native";

const useFormInputRootStyles = () => {
    const {theme} = useTheme();
    return StyleSheet.create({
        rootContainer: {
            flexDirection: 'column',
        },

        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            gap: theme.spacing.s_8

        },
 
    })
}

export default useFormInputRootStyles;


