import React, { useRef } from "react";
import { InputVariants, InputFilledState, InputFocusedState, InputStatus } from "./Input.model";
import { createContext, useContext } from "react";
import { EventEmitter } from "eventemitter3";

export type FilledEvent = {
    on(event: InputFilledState, fn: (value: any) => void): void;
    emit(event: InputFilledState, value?: any): void;
  };
  
 export type FocusedEvent = {
    on(event: InputFocusedState, fn: (value: any) => void): void;
    emit(event: InputFocusedState, value?: any): void;
  };
  
 export type DisabledEvent = {
    on(event: InputStatus, fn: (value: any) => void): void;
    emit(event: InputStatus, value?: any): void;
  };
  
 export type RequiredEvent = {
    on(event: 'required' | 'notRequired', fn: (value: any) => void): void;
    emit(event: 'required' | 'notRequired', value?: any): void;
  };

 export type InputClickEvent = {
    on(event: 'inputClick', fn: (value: any) => void): void;
    emit(event: 'inputClick', value?: any): void;
  };

export interface InputContextProps {
  variant: InputVariants;
  filled: InputFilledState;
  focused: InputFocusedState;
  status: InputStatus;
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

const InputContext = createContext<InputContextProps | undefined>(undefined);

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within a InputProvider");
  }
  return context;
};
const InputProvider: React.FC<InputContextProps & { children: React.ReactNode }> = React.memo(({ children, ...props }) => {

  
    return <InputContext.Provider value={{...props}}>{children}</InputContext.Provider>;
  });
  
  export { InputProvider };