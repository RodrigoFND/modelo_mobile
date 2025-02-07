import React, { useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { EventEmitter } from "eventemitter3";
import {
  InputFilledState,
  InputFocusedState,
  InputStatus,
  InputVariants,
} from "../Input.model";
import {
  InputContextProps,
  InputProvider,
  FocusedEvent,
  FilledEvent,
  InputClickEvent,
} from "../InputContext";
import { useInputRootStyles } from "./InputRoot.style";

interface InputRootProps
  extends Omit<
    Partial<InputContextProps>,
    "onFilled" | "onFocused" | "filled" | "focused" | "status"
  > {
  variant?: InputVariants;
  status?: InputStatus;
  children: React.ReactNode;
  editable?: boolean;
  error?: boolean;
}

const InputRoot: React.FC<InputRootProps> = ({
  children,
  variant = "md",
  error = false,
  editable = true,
  ...props
}) => {
  // Combine os estados relacionados
  const [filled, setFilled] = useState<InputFilledState>("notFilled");
  const [focused, setFocused] = useState<InputFocusedState>("notFocused");
  const status: InputStatus = !editable
    ? "disabled"
    : error
    ? "error"
    : "default";

  const styles = useInputRootStyles({
    variant,
    status,
    filledState: filled,
    focusedState: focused,
  });

  const eventEmitters = useRef({
    filled: new EventEmitter() as EventEmitter & FilledEvent,
    focused: new EventEmitter() as EventEmitter & FocusedEvent,
    click: new EventEmitter() as EventEmitter & InputClickEvent,
  });

  const listeners = useRef({
    filled: () => setFilled("filled"),
    notFilled: () => setFilled("notFilled"),
    focused: () => setFocused("focused"),
    notFocused: () => setFocused("notFocused"),
  });

  useMemo(() => {
    const { filled, focused } = eventEmitters.current;
    filled.on("filled", listeners.current.filled);
    filled.on("notFilled", listeners.current.notFilled);
    focused.on("focused", listeners.current.focused);
    focused.on("notFocused", listeners.current.notFocused);

    return () => {
      filled.removeAllListeners();
      focused.removeAllListeners();
    };
  }, []);

  const handleLabelPress = () => {
    eventEmitters.current.click.emit("inputClick");
  };

  return (
    <InputProvider
      {...props}
      variant={variant}
      filled={filled}
      focused={focused}
      status={status}
      editable={editable}
      onFilled={eventEmitters.current.filled}
      onFocused={eventEmitters.current.focused}
      onInputClick={eventEmitters.current.click}
    >

      <Pressable style={styles.inputContainer}  onPress={handleLabelPress}>

        {children}

        </Pressable>
    </InputProvider>


  );
};

export default InputRoot;
