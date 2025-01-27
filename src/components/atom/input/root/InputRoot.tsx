import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { EventEmitter } from "eventemitter3";
import { useInputRootStyles } from "./InputRoot.style";
import {
  InputFilledState,
  InputFocusedState,
  InputStatus,
  InputVariants,
} from "../Input.model";
import { InputContextProps, InputProvider, FocusedEvent, FilledEvent, InputClickEvent } from "../InputContext";
import InputLabel from "./input-label/InputLabel";
import InputError from "./input-error/InputError";

interface InputRootProps extends Omit<Partial<InputContextProps>, "onFilled" | "onFocused" | "filled" | "focused"> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  variant?: InputVariants;
  fullWidth?: boolean;
  children: React.ReactNode;
  required?: boolean;
  editable?: boolean;
}

const InputRoot: React.FC<InputRootProps> = ({
  children,
  variant = "md",
  error = false,
  errorMessage = "",
  fullWidth = false,
  label = "",
  editable = true,
  required = false,
  ...props
}) => {
  // Combine os estados relacionados
  const [filled, setFilled] = useState<InputFilledState>("notFilled");
  const [focused, setFocused] = useState<InputFocusedState>("notFocused");


  // Agrupe os EventEmitters relacionados

  const status: InputStatus = !editable ? "disabled" : error ? "error" : "default";
  const styles = useInputRootStyles({
    variant,
    status,
    filledState: filled,
    focusedState: focused,
    fullWidth,
  });

  const eventEmitters = useRef({
    filled: new EventEmitter() as EventEmitter & FilledEvent,
    focused: new EventEmitter() as EventEmitter & FocusedEvent,
    click: new EventEmitter() as EventEmitter & InputClickEvent
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
      error={error}
      errorMessage={errorMessage}
      fullWidth={fullWidth}
      label={label}
      editable={editable}
      filled={filled}
      focused={focused}
      required={required}
      status={status}
      onFilled={eventEmitters.current.filled}
      onFocused={eventEmitters.current.focused}
      onInputClick={eventEmitters.current.click}
    >
      <Pressable onPress={handleLabelPress}>
        <InputLabel />
        <View style={styles.inputContainer}>{children}</View>
        {error && errorMessage && <InputError />}
      </Pressable>
    </InputProvider>
  );
};

export { InputRoot };
