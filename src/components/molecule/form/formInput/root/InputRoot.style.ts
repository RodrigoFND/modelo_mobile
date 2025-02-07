import { useTheme } from "@/src/providers/ThemeProvider";
import { StyleSheet } from "react-native";
import { FormInputVariants, FormInputStatus, FormInputFilledState, FormInputFocusedState } from "../FormInput.model";
import { BaseTheme } from "@/src/styles/theme.style";
import { scaleSize } from "@/src/styles/mixing.style";


const inputVariants : { [key in FormInputVariants]: {width: number, height: number, paddingHorizontal: number, paddingVertical: number} } = {
    md: {width: scaleSize(150), height: scaleSize(54), paddingHorizontal: scaleSize(16), paddingVertical: scaleSize(12)},

    lg: {width: scaleSize(150), height: scaleSize(64), paddingHorizontal: scaleSize(20), paddingVertical: scaleSize(16)}
}

const borderColorMap: { [key in FormInputFilledState]: { [key in FormInputStatus]: { [key in FormInputFocusedState]: (theme: BaseTheme) => string } } } = {
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
}

interface FormInputRootStylesProps {
    variant: FormInputVariants,
    status: FormInputStatus,
    filledState: FormInputFilledState,
    focusedState: FormInputFocusedState,
    fullWidth: boolean


}

export const useFormInputRootStyles = (styles: FormInputRootStylesProps) => {
    const {theme} = useTheme();

    return StyleSheet.create({
        inputContainer: {
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: styles.status == 'disabled' ? theme.mapped.surface.disabled : theme.mapped.surface.default,
            borderColor: borderColorMap[styles.filledState][styles.status][styles.focusedState](theme),
            borderWidth: 1,
            borderRadius: theme.borderRadius.r_8,
            paddingHorizontal: inputVariants[styles.variant].paddingHorizontal,
            paddingVertical: inputVariants[styles.variant].paddingVertical,
            minWidth: styles.fullWidth ? '100%' : inputVariants[styles.variant].width,
            height: inputVariants[styles.variant].height,
            gap: scaleSize(8),
        }
      
    })
}