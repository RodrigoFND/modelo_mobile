import { StyleSheet } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider";
import { BaseTheme } from "@/src/styles/theme.style";
import { FormInputFilledState, FormInputVariants } from "../FormInput.model";
import { FormInputStatus } from "../FormInput.model";
import { scaleSize } from "@/src/styles/mixing.style";


interface FormInputIconStylesProps {
  variant: FormInputVariants,
  filledState: FormInputFilledState,
  status: FormInputStatus,


}

const iconSizeMap: { [key in FormInputVariants]: number } = {
  md: scaleSize(26),
  lg: scaleSize(28),
};


const iconColorMap: {
  [key in FormInputFilledState]: {
    [key in FormInputStatus]: (theme: BaseTheme) => string;
  };
} = {
  filled: {
   default: theme => theme.mapped.text.defaultInverted,
   error: theme => theme.mapped.text.danger,
   disabled: theme => theme.mapped.text.disabled,
  },
  notFilled: {
    default: theme => theme.mapped.text.disabled,
    error: theme => theme.mapped.text.danger,
    disabled: theme => theme.mapped.text.disabled,
  },
};

 const useFormInputIconStyles = (styles: FormInputIconStylesProps) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    icon: {
      color: iconColorMap[styles.filledState][styles.status](theme),
      fontSize: iconSizeMap[styles.variant],
    },
  });
};

export default useFormInputIconStyles;

