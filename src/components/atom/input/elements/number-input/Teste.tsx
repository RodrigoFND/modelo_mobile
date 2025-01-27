import React from 'react';
import { TextInput, Text, View, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface NumberInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  placeholder?: string;
  min?: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  maxLength?: number;
}

function NumberInput<TFieldValues extends FieldValues>({ 
  control, 
  name, 
  rules = {}, 
  placeholder = 'Enter number', 
  min = -Infinity, 
  max = Infinity,
  style,
  inputStyle,
  maxLength = 10
}: NumberInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        validate: {
          numberRange: (value) => {
            if (value === undefined || value === null) return true;
            const stringValue = value.toString();
            return (
              (stringValue.length <= maxLength || `Maximum ${maxLength} digits allowed`) &&
              (isNaN(parseFloat(value)) && 'Invalid number') ||
              (parseFloat(value) < min && `Minimum value is ${min}`) ||
              (parseFloat(value) > max && `Maximum value is ${max}`) ||
              true
            );
          },
          ...rules.validate
        }
      }}
      render={({ 
        field: { onChange, value, ref }, 
        fieldState: { error } 
      }) => (
        <View style={style}>
          <TextInput
            ref={ref}
            keyboardType="numeric"
            placeholder={placeholder}
            value={value ? value.toString() : ''}
            onChangeText={(text) => {
              const cleanedText = text.replace(/[^0-9.-]/g, '');
              const numValue = cleanedText === '' ? null : parseFloat(cleanedText);
              onChange(numValue);
            }}
            style={[
              { 
                borderWidth: 1, 
                borderColor: error ? 'red' : 'gray',
                borderRadius: 4,
                padding: 8,
                fontSize: 16
              },
              inputStyle
            ]}
          />
          {error && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

export default NumberInput;