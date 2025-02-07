import React, { useRef } from "react";
import {
  FormInputVariants,
  FormInputFilledState,
  FormInputFocusedState,
  FormInputStatus,
} from "./FormInput.model";
import { createContext, useContext } from "react";
import { EventEmitter } from "eventemitter3";

export type FilledEvent = {
  on(event: FormInputFilledState, fn: (value: any) => void): void;
  emit(event: FormInputFilledState, value?: any): void;
};

export type FocusedEvent = {
  on(event: FormInputFocusedState, fn: (value: any) => void): void;
  emit(event: FormInputFocusedState, value?: any): void;
};

export type DisabledEvent = {
  on(event: FormInputStatus, fn: (value: any) => void): void;
  emit(event: FormInputStatus, value?: any): void;
};

export type RequiredEvent = {
  on(event: "required" | "notRequired", fn: (value: any) => void): void;
  emit(event: "required" | "notRequired", value?: any): void;
};

export type InputClickEvent = {
  on(event: "inputClick", fn: (value: any) => void): void;
  emit(event: "inputClick", value?: any): void;
};

export interface FormInputContextProps {
  variant: FormInputVariants;
  filled: FormInputFilledState;
  focused: FormInputFocusedState;
  status: FormInputStatus;
  label: string;
  editable: boolean;
  required: boolean;
  onFilled: FilledEvent;

  onFocused: FocusedEvent;
  fullWidth: boolean;
  error: boolean;
  errorMessage: string;
  onInputClick: InputClickEvent;
}

const FormInputContext = createContext<FormInputContextProps | undefined>(
  undefined
);

export const useFormInputContext = () => {
  const context = useContext(FormInputContext);
  if (!context) {
    throw new Error("useFormInputContext must be used within a FormInputProvider");
  }
  return context;
};

const FormInputProvider: React.FC<
  FormInputContextProps & { children: React.ReactNode }
> = React.memo(({ children, ...props }) => {
  return (
    <FormInputContext.Provider value={{ ...props }}>
      {children}
    </FormInputContext.Provider>
  );
});

export { FormInputProvider };
