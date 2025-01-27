// src/components/ButtonContext.tsx
import React, { createContext, useContext } from 'react';
import { ButtonAlignments, ButtonBorder, ButtonActions, ButtonVariants, ButtonType } from './Button.model';

export interface ButtonContextProps {
  onPress: () => void;
  variant: ButtonVariants;
  action: ButtonActions;
  type: ButtonType;
  shape: ButtonBorder;
  alignHorizontal: ButtonAlignments;
  disabled: boolean;
}

const ButtonContext = createContext<ButtonContextProps | undefined>(undefined);

export const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('useButtonContext must be used within a ButtonProvider');
  }
  return context;
};

const ButtonProvider: React.FC<ButtonContextProps & { children: React.ReactNode }> = React.memo(({ children, ...props }) => {
  return <ButtonContext.Provider value={props}>{children}</ButtonContext.Provider>;
});

export { ButtonProvider };