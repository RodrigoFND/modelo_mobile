import { useTheme } from "@/src/providers/ThemeProvider";
import { StyleSheet } from "react-native";

const useFormInputErrorStyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    errorContainer: {
      marginTop: theme.spacing.s_8,
    },
  });
};

export default useFormInputErrorStyles;
