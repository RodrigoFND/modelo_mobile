import {
  ForwardedRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { TextInput } from "react-native";
import { useInputContext } from "../InputContext";

export function useInputRef<T extends Partial<TextInput>>(
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
    handlers.handleChangeText(value)
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
      onFilled?.emit(text || '0' ? "filled" : "notFilled");
    },
  };

  return { ref, handlers, editable, status, variant };
}
