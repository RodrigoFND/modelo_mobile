import { useTheme } from "@/src/providers/ThemeProvider";
import { StyleSheet } from "react-native";
import { FormInputStatus, FormInputVariants } from "../FormInput.model";
import { BaseTheme } from "@/src/styles/theme.style";


const textSizeMap: {
  [key in FormInputVariants]: (theme: BaseTheme) => {
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;

  };
} = {
  lg: (theme: BaseTheme) => ({
    fontSize: theme.fontSizes.label_large_18.size,
    lineHeight: theme.fontSizes.label_large_18.lineHeight,
    letterSpacing: theme.fontSizes.label_large_18.letterSpacing,
  }),
  md: (theme: BaseTheme) => ({
    fontSize: theme.fontSizes.label_medium_16.size,
    lineHeight: theme.fontSizes.label_medium_16.lineHeight,
    letterSpacing: theme.fontSizes.label_medium_16.letterSpacing,
  }),
};

const textColorMap: {
  [key in FormInputStatus]: (theme: BaseTheme) => string;
} = {
  default: (theme: BaseTheme) => theme.mapped.text.on.default,
  error: (theme: BaseTheme) => theme.mapped.text.danger,
  disabled: (theme: BaseTheme) => theme.mapped.text.disabled,
};


interface InputStylesProps {
  variant: FormInputVariants;
  status: FormInputStatus;
}


const useFormInputStyle = (styles: InputStylesProps) => {
  const { theme } = useTheme();
  return StyleSheet.create({
    input: {
      flex: 1,
      fontSize: textSizeMap[styles.variant](theme).fontSize,
      letterSpacing: textSizeMap[styles.variant](theme).letterSpacing,
      fontFamily: theme.fontFamily.primary.medium,
      color: textColorMap[styles.status](theme),
      textAlignVertical: "center", // Centraliza verticalmente
      includeFontPadding: true,
      paddingVertical: 0, // 🔹 Evita padding extra em certos dispositivos
    },
    placeholder: {
      color: theme.mapped.text.disabled,
    },
  });
};

export default useFormInputStyle;
