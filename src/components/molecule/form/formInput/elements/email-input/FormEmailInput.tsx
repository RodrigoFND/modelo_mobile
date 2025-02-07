import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useFormInputRef } from '../useFormInputRef';
import useFormInputStyle from '../FormInput.style';

type FormInputEmailProps = Omit<TextInputProps, 'required' | 'editable' | 'keyboardType' | 'textContentType'> & {
}

const FormInputEmail = forwardRef<Partial<TextInput>, FormInputEmailProps>(
    ({ onChangeText, numberOfLines = 1, style, onFocus, onBlur, value = '', placeholder = 'Email', ...props }, forwardedRef) => {
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
            keyboardType="email-address"
            textContentType="emailAddress"
            importantForAutofill='yes'
            autoComplete='email'
            placeholder={placeholder}
            {...props}
          
        />
    );
});
export default FormInputEmail;
