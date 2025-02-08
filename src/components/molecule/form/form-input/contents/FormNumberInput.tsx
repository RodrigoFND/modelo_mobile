import React, { useState, useEffect } from "react";
import { InputContentProps } from "@/src/components/atom/input/content/InputContent";
import Input from "@/src/components/atom/input";
import { TextInput } from "react-native";

type FormInputNumberProps = Omit<
  InputContentProps,
  "value" | "onChangeText" | "onBlur" | "keyboardType"
> & {
  value?: number;
  onChangeNumber?: (numValue: number) => void;
  onBlur?: (numValue: number) => void;
  allowDecimals?: boolean;
  maxDecimalPlaces?: number;
  maxLength?: number;
};

const FormInputNumber = React.forwardRef<TextInput, FormInputNumberProps>(
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
    ref
  ) => {
    const [internalText, setInternalText] = useState(String(value ?? ""));

    useEffect(() => {
      setInternalText(String(value ?? ""));
    }, [value]);

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
      onChangeNumber?.(numericValue);
    }

    const handleBlur = () => {
      if (internalText.endsWith(".")) {
        setInternalText(internalText.slice(0, -1));
      }

      onBlur?.(value);
    };

    return (
      <Input.Content
        ref={ref}
        value={internalText}
        onBlur={handleBlur}
        onChangeText={handleChangeTextNumber}
        numberOfLines={numberOfLines}
        keyboardType={allowDecimals ? "decimal-pad" : "number-pad"}
        {...props}
      />
    );
  }
);

export default FormInputNumber;
