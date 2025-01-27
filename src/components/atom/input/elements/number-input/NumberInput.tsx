import React, { forwardRef, useState, useEffect } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useInputRef } from "../useInputRef";
import useInputStyle from "../Input.style";

type InputNumberProps = Omit<
  TextInputProps,
  "value" | "onChangeText" | "required" | "editable"
> & {
  /** Valor numérico controlado externamente. */
  value?: number;

  /** Chamado quando o valor numérico muda (depois do filtro). */
  onChangeNumber?: (numValue: number) => void;

  /** Permitir uso de ponto/vírgula (decimais)? */
  allowDecimals?: boolean;

  /** Máximo de casas decimais. Se não definido, sem limite. */
  maxDecimalPlaces?: number;

  /** Limite total de caracteres (incluindo ponto e vírgula). */
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
    // --- 1) ESTADO INTERNO DE STRING ---
    const [internalText, setInternalText] = useState(String(value ?? "0"));

    // Se "value" mudar externamente, atualiza o estado interno
    useEffect(() => {
      setInternalText(String(value ?? ""));
    }, [value]);

    // useInputRef para foco, blur, etc. Passamos callbacks de foco/blur e uma função vazia
    // para onChangeText (já que faremos o controle manual abaixo).
    const { handlers, ref, editable, status, variant } = useInputRef(
      forwardedRef,
      onFocus,
      onBlur,
      onChangeNumber,
      value // passamos a string para o contexto, se necessário
    );

    const styles = useInputStyle({ variant, status });

    // Remove caracteres indesejados com base no padrão (regex)
    function removeInvalidChars(
      rawText: string,
      allowDecimals: boolean
    ): string {
      const pattern = allowDecimals ? "[^0-9.,]" : "[^0-9]";
      return rawText.replace(new RegExp(pattern, "g"), "");
    }

    // Substitui vírgulas por pontos e mantém apenas o primeiro ponto
    function normalizeDecimalSeparators(text: string): string {
      // Substituir ',' por '.'
      text = text.replace(",", ".");

      // Remove pontos extras (mantém apenas o primeiro)
      const firstDot = text.indexOf(".");
      if (firstDot !== -1) {
        text =
          text.substring(0, firstDot + 1) +
          text.substring(firstDot + 1).replace(/\./g, "");
      }

      return text;
    }

    // Limita o número de casas decimais
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

    // Limita o comprimento total do texto
    function limitTextLength(text: string, maxLength: number): string {
      return text.length > maxLength ? text.slice(0, maxLength) : text;
    }

    // Função principal que junta tudo
    function handleChangeTextNumber(rawText: string) {
      console.log("rawText", rawText);
      // 1) Remove caracteres inválidos
      let filtered = removeInvalidChars(rawText, allowDecimals);

      // 2) Normaliza separadores decimais (se permitido)
      if (allowDecimals) {
        filtered = normalizeDecimalSeparators(filtered);

        // 3) Limita casas decimais
        filtered = limitDecimalPlaces(filtered, maxDecimalPlaces);
      }

      // 4) Limita o comprimento total
      filtered = limitTextLength(filtered, maxLength);

      // 5) Atualiza o estado interno para refletir a entrada
      console.log("filtered", filtered);
      setInternalText(filtered || "0");

      // 6) Converte a string filtrada para número
      let numericValue = parseFloat(filtered);
      if (isNaN(numericValue)) {
        numericValue = 0; // Define um valor padrão para NaN
      }

      console.log("console", numericValue);

      // 7) Passa o número final para o contexto ou callback
      handlers.handleChangeText(numericValue);
    }

    const handleBlur = () => {
      console.log("Blur event triggered");

      // Remove o ponto final (".") caso seja o último caractere
      if (internalText.endsWith(".")) {
        setInternalText(internalText.slice(0, -1)); // Remove o último caractere
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
