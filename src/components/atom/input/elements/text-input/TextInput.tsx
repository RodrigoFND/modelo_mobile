import React, { forwardRef, useEffect } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useInputRef } from '../useInputRef';
import useInputStyle from '../Input.style';

type InputTextProps = Omit<TextInputProps, 'required' | 'editable'>

const InputText = forwardRef<Partial<TextInput>, InputTextProps>(
    ({ onChangeText, numberOfLines = 1, style, onFocus, onBlur, value = '', ...props }, forwardedRef) => {
    const {handlers, ref, editable, status, variant} =  useInputRef(forwardedRef, onFocus, onBlur, onChangeText, value);
    const styles = useInputStyle({variant,status});
    console.log("rendered")


    return (
        <TextInput
            ref={ref}
            editable={editable}
            value={value}
            style={[styles.input, style]}
            onFocus={handlers.handleFocus}
            numberOfLines={numberOfLines}
            onBlur={handlers.handleBlur}
            onChangeText={handlers.handleChangeText}
            {...props}
          
        />
    );
});
export default InputText;
