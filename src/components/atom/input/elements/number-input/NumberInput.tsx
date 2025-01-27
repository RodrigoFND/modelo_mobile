import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useInputContext } from '../../InputContext';

// Define a interface do ref
export interface InputNumberRef {
  focus?: () => void;
  blur?: () => void;
  // ... outros métodos que queira expor
}

type NumberType = 'decimal' | 'integer';

type NumberInputProps = {
  onChangeNumber: (value: number) => void;
  value?: number;
  type?: 'integer' | 'decimal';
  decimalPlaces?: number;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
} & Omit<TextInputProps, 'onChangeText' | 'value'>;

export const InputNumber = forwardRef<InputNumberRef, NumberInputProps>(
  ({ onChangeNumber, value, type = 'integer', decimalPlaces = 2, onFocus, onBlur, ...props }, forwardedRef) => {
    const { onFilled, onFocused } = useInputContext();
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(forwardedRef, () => ({
      focus: () => {
        inputRef.current?.focus();
       console.log("imperative focus")
      },
      blur: () => {
        inputRef.current?.blur();
        console.log("imperative blur")
      }
    }));

    // Handlers internos separados dos props
    const handleInternalFocus = () => {
      console.log('Foco interno detectado');
      onFocused?.emit('focused');
    };

    const handleInternalBlur = () => {
      console.log('Blur interno detectado');
      onFocused?.emit('notFocused');
    };

    const formatNumber = (text: string) => {
      if (type === 'integer') {
        // Remove tudo exceto números
        const numValue = Number(text.replace(/[^0-9]/g, ''));
        return isNaN(numValue) ? 0 : numValue;
      } else {
        // Permite números e um único ponto decimal
        const cleanText = text.replace(/[^0-9.]/g, '')
          .replace(/(\..*)\./g, '$1'); // Permite apenas um ponto decimal
        
        const numValue = Number(cleanText);
        return isNaN(numValue) ? 0 : Number(numValue.toFixed(decimalPlaces));
      }
    };

    return (
      <TextInput
        ref={inputRef}
        onFocus={(e) => {
          handleInternalFocus(); // Sempre executa a lógica interna
          onFocus?.(e); // Executa o onFocus do parent se existir
        }}
        onBlur={(e) => {
          handleInternalBlur(); // Sempre executa a lógica interna
          onBlur?.(e); // Executa o onBlur do parent se existir
        }}
        keyboardType="decimal-pad"
        onChangeText={(text) => {
          const numValue = formatNumber(text);
          onChangeNumber(numValue);
          onFilled?.emit(numValue ? 'filled' : 'notFilled');
        }}
        value={value?.toString()}
        {...props}
      />
    );
  }
);