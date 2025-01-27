import React, { forwardRef, useState, useEffect } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useInputRef } from "../useInputRef";
import useInputStyle from "../Input.style";

type InputNumberProps = Omit<
  TextInputProps,
  "value" | "onChangeText" | "required" | "editable"
> & {
  value?: number;
  onChangeNumber?: (numValue: number) => void;
  allowDecimals?: boolean;
  maxDecimalPlaces?: number;
  maxLength?: number;
};

const InputNumber = forwardRef<Partial<TextInput>, InputNumberProps>(
  (
    {
      value = 0,
      onChangeNumber,
      allowDecimals = false,
      maxDecimalPlaces,
      maxLength = 10,
      onFocus,
      onBlur,
      numberOfLines = 1,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const [internalText, setInternalText] = useState(String(value ?? ""));

    useEffect(() => {
      setInternalText(String(value ?? ""));
    }, [value]);

    const { handlers, ref, editable, status, variant } = useInputRef(
      forwardedRef,
      onFocus,
      onBlur,
      onChangeNumber,
      value 
    );

    const styles = useInputStyle({ variant, status });

    function removeInvalidChars(
      rawText: string,
      allowDecimals: boolean
    ): string {
      const pattern = allowDecimals ? "[^0-9.,]" : "[^0-9]";
      return rawText.replace(new RegExp(pattern, "g"), "");
    }

    function normalizeDecimalSeparators(text: string): string {
      text = text.replace(",", ".");
      const firstDot = text.indexOf(".");
      if (firstDot !== -1) {
        text =
          text.substring(0, firstDot + 1) +
          text.substring(firstDot + 1).replace(/\./g, "");
      }

      return text;
    }

    function limitDecimalPlaces(
      text: string,
      maxDecimalPlaces?: number
    ): string {
      if (maxDecimalPlaces === undefined) return text;

      const dotPos = text.indexOf(".");
      if (dotPos !== -1) {
        const intPart = text.substring(0, dotPos);
        let decPart = text.substring(dotPos + 1);

        if (decPart.length > maxDecimalPlaces) {
          decPart = decPart.slice(0, maxDecimalPlaces);
        }

        return intPart + "." + decPart;
      }

      return text;
    }

    function limitTextLength(text: string, maxLength: number): string {
      return text.length > maxLength ? text.slice(0, maxLength) : text;
    }

    function handleChangeTextNumber(rawText: string) {
      let filtered = removeInvalidChars(rawText, allowDecimals);
      if (allowDecimals) {
        filtered = normalizeDecimalSeparators(filtered);
        filtered = limitDecimalPlaces(filtered, maxDecimalPlaces);
      }
      filtered = limitTextLength(filtered, maxLength);
      let numericValue = parseFloat(filtered);
      if (isNaN(numericValue)) {
        numericValue = 0;
      }
      setInternalText(filtered || "0");
      handlers.handleChangeText(numericValue);
    }

    const handleBlur = () => {
      if (internalText.endsWith(".")) {
        setInternalText(internalText.slice(0, -1));
      }
      handlers.handleBlur(value);
    };

    return (
      <TextInput
        ref={ref}
        editable={editable}
        value={internalText} // Exibimos a string do nosso estado interno
        style={[styles.input, style]}
        onFocus={handlers.handleFocus}
        onBlur={handleBlur}
        numberOfLines={numberOfLines}
        keyboardType={allowDecimals ? "decimal-pad" : "number-pad"}
        onChangeText={handleChangeTextNumber}
        returnKeyType="done"
        {...props}
      />
    );
  }
);

export default InputNumber;
