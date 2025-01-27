import React from 'react';
import { TextInput, StyleSheet, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface InputNumberProps {
  label?: string;
  value: number | undefined;
  onChangeValue: (value: number | undefined) => void;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const InputNumber2: React.FC<InputNumberProps> = ({
  label,
  value,
  onChangeValue,
  error,
  placeholder,
  min,
  max,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
}) => {
  const handleChangeText = (text: string) => {
    // Tenta converter o valor em número
    const numericValue = parseInt(text, 10);

    // Caso seja NaN, informa undefined
    if (isNaN(numericValue)) {
      onChangeValue(undefined);
      return;
    }

    // Limita se tiver min e/ou max definidos
    if (min !== undefined && numericValue < min) {
      onChangeValue(min);
    } else if (max !== undefined && numericValue > max) {
      onChangeValue(max);
    } else {
      onChangeValue(numericValue);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      ) : null}

      <TextInput
        style={[styles.input, inputStyle]}
        keyboardType="numeric"
        value={value !== undefined ? String(value) : ''}
        onChangeText={handleChangeText}
        placeholder={placeholder}
      />

      {error ? (
        <Text style={[styles.error, errorStyle]}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 4,
  },
  error: {
    marginTop: 4,
    color: 'red',
  },
});
