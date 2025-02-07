import React, { useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { EventEmitter } from "eventemitter3";
import { useFormInputRootStyles } from "./InputRoot.style";
import {
  FormInputFilledState,
  FormInputFocusedState,
  FormInputStatus,
  FormInputVariants,

} from "../FormInput.model";
import { FormInputContextProps, FormInputProvider, FocusedEvent, FilledEvent, InputClickEvent } from "../FormInputContext";
import FormInputLabel from "./input-label/FormInputLabel";
import InputError from "./input-error/InputError";


interface FormInputRootProps extends Omit<Partial<FormInputContextProps>, "onFilled" | "onFocused" | "filled" | "focused"> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  variant?: FormInputVariants;
  fullWidth?: boolean;
  children: React.ReactNode;
  required?: boolean;
  editable?: boolean;

}

const FormInputRoot: React.FC<FormInputRootProps> = ({
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
  const [filled, setFilled] = useState<FormInputFilledState>("notFilled");
  const [focused, setFocused] = useState<FormInputFocusedState>("notFocused");



  // Agrupe os EventEmitters relacionados

  const status: FormInputStatus = !editable ? "disabled" : error ? "error" : "default";
  const styles = useFormInputRootStyles({
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
    <FormInputProvider
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
        <FormInputLabel />
        <View style={styles.inputContainer}>{children}</View>
        {error && errorMessage && <InputError />}
      </Pressable>
    </FormInputProvider>
  );
};

export default  FormInputRoot ;
