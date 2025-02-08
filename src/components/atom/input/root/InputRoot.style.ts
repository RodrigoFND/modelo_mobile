import { useTheme } from "@/src/providers/ThemeProvider";
import { StyleSheet } from "react-native";
import {
  InputVariants,
  InputStatus,
  InputFilledState,
  InputFocusedState,
} from "../Input.model";
import { BaseTheme } from "@/src/styles/theme.style";
import { scaleSize } from "@/src/styles/mixing.style";

const inputVariants: {
  [key in InputVariants]: {
    width: number;
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
  };
} = {
  md: {
    width: scaleSize(150),
    height: scaleSize(54),
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(12),
  },
  lg: {
    width: scaleSize(150),
    height: scaleSize(64),
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(16),
  },
};

const borderColorMap: {
  [key in InputFilledState]: {
    [key in InputStatus]: {
      [key in InputFocusedState]: (theme: BaseTheme) => string;
    };
  };
} = {
  filled: {
    default: {
      notFocused: (theme: BaseTheme) => theme.mapped.border.filled.default,

      focused: (theme: BaseTheme) => theme.mapped.border.filled.defaultFocused,
    },

    error: {
      notFocused: (theme: BaseTheme) => theme.mapped.border.filled.error,
      focused: (theme: BaseTheme) => theme.mapped.border.filled.errorFocused,
    },
    disabled: {
      notFocused: (theme: BaseTheme) => theme.mapped.border.filled.disabled,
      focused: (theme: BaseTheme) => theme.mapped.border.filled.disabled,
    },
  },
  notFilled: {
    default: {
      notFocused: (theme: BaseTheme) => theme.mapped.border.default,
      focused: (theme: BaseTheme) => theme.mapped.border.defaultFocused,
    },
    error: {
      notFocused: (theme: BaseTheme) => theme.mapped.border.error,
      focused: (theme: BaseTheme) => theme.mapped.border.errorFocused,
    },
    disabled: {
      notFocused: (theme: BaseTheme) => theme.mapped.border.disabled,
      focused: (theme: BaseTheme) => theme.mapped.border.disabled,
    },
  },
};

interface InputRootStylesProps {
  variant: InputVariants;
  status: InputStatus;
  filledState: InputFilledState;
  focusedState: InputFocusedState;
}

export const useInputRootStyles = (styles: InputRootStylesProps) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    inputContainer: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        styles.status == "disabled"
          ? theme.mapped.surface.disabled
          : theme.mapped.surface.default,
      borderColor:
        borderColorMap[styles.filledState][styles.status][styles.focusedState](
          theme
        ),
      borderWidth: 1,
      borderRadius: theme.borderRadius.r_8,
      paddingHorizontal: inputVariants[styles.variant].paddingHorizontal,

      paddingVertical: inputVariants[styles.variant].paddingVertical,
      minHeight: inputVariants[styles.variant].height,
    },
  });
};
