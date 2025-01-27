import { StyleSheet } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider";
import { BaseTheme } from "@/src/styles/theme.style";
import { InputFilledState, InputVariants } from "../Input.model";
import { InputStatus } from "../Input.model";
import { scaleSize } from "@/src/styles/mixing.style";

interface InputIconStylesProps {
  variant: InputVariants,
  filledState: InputFilledState,
  status: InputStatus,

}

const iconSizeMap: { [key in InputVariants]: number } = {
  md: scaleSize(28),
  lg: scaleSize(32),
};

const iconColorMap: {
  [key in InputFilledState]: {
    [key in InputStatus]: (theme: BaseTheme) => string;
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

 const useInputIconStyles = (styles: InputIconStylesProps) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    icon: {
      color: iconColorMap[styles.filledState][styles.status](theme),
      fontSize: iconSizeMap[styles.variant],
    },
  });
};

export default useInputIconStyles;

