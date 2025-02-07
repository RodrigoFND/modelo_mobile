import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useFormInputRef } from '../useFormInputRef';
import useFormInputStyle from '../FormInput.style';

type FormInputTextProps = Omit<TextInputProps, 'required' | 'editable'>

const FormInputText = forwardRef<Partial<TextInput>, FormInputTextProps>(
    ({ onChangeText, numberOfLines = 1, style, onFocus, onBlur, value = '', ...props }, forwardedRef) => {
    const {handlers, ref, editable, status, variant} =  useFormInputRef(forwardedRef, onFocus, onBlur, onChangeText, value);
    const styles = useFormInputStyle({variant,status});

    return (
        <TextInput
            ref={ref}
            editable={editable}
            value={value}
            style={[styles.input, style]}
            placeholderTextColor={styles.placeholder.color}
            onFocus={handlers.handleFocus}
            numberOfLines={numberOfLines}
            onBlur={handlers.handleBlur}
            onChangeText={handlers.handleChangeText}
            {...props}
          
        />
    );
});
export default FormInputText;
