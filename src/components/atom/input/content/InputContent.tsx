import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { TextInput, TextInputProps } from "react-native";
import useInputStyle from "./InputContent.style";
import { useInputContext } from "@/src/components/atom/input/InputContext";


function useInputRef<T extends Partial<TextInput>>(
  forwardedRef: ForwardedRef<T>,
  onFocus?: (e: any) => void,
  onBlur?: (e: any) => void,
  onChangeText?: (text: any) => void,
  value?: any
) {
  const { onFilled, onFocused, onInputClick, editable, status, variant } =
    useInputContext();
  const ref = useRef<TextInput>(null);
  const focusListener = useRef(() => ref.current?.focus());

  useImperativeHandle(
    forwardedRef,
    () =>
      ({
        focus: () => {
          if (editable) {
            ref.current?.focus();
            handlers.handleFocus(null, false);
          }
        },
        blur: () => {
          if (editable) {
            ref.current?.blur();
            handlers.handleBlur(null, false);
          }
        },
        current: ref.current, //replaces ref for parent ref
      } as unknown as T)
  );

  useEffect(() => {
    handlers.handleChangeText(value);
  }, [value]);

  useEffect(() => {
    onInputClick?.on("inputClick", focusListener.current);
  }, [onInputClick]);

  const handlers = {
    handleFocus: (e: any, dispatchToParent: boolean = true) => {
      onFocused?.emit("focused");
      if (dispatchToParent) onFocus?.(e);
    },
    handleBlur: (e: any, dispatchToParent: boolean = true) => {
      onFocused?.emit("notFocused");
      if (dispatchToParent) onBlur?.(e);
    },
    handleChangeText: (text: any) => {
      onChangeText?.(text);
      onFilled?.emit(text || "0" ? "filled" : "notFilled");
    },
  };

  return { ref, handlers, editable, status, variant };
}

interface InputContentProps extends TextInputProps {
  children?: React.ReactNode;
}

const InputContent = forwardRef<TextInput, InputContentProps>(
  (
    {
      onChangeText,
      numberOfLines = 1,
      style,
      onFocus,
      onBlur,
      value = "",
      ...props
    },
    forwardedRef
  ) => {
    const { handlers, ref, editable, status, variant } = useInputRef(
      forwardedRef,
      onFocus,
      onBlur,
      onChangeText,
      value
    );
    const styles = useInputStyle({ variant, status });

    return (
      <TextInput
        ref={ref}
        editable={editable}
        value={value}
        style={[styles.input, style]}
        placeholderTextColor={styles.placeholder.color}
        onFocus={handlers.handleFocus}
        numberOfLines={numberOfLines}
        onBlur={handlers.handleBlur}
        onChangeText={handlers.handleChangeText}
        {...props}
      />
    );
  }
);
export default InputContent;
