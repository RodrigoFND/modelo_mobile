import React from "react";
import { StyleProp, ViewStyle, ActivityIndicator } from "react-native";
import { CircleSnail } from 'react-native-progress';
import { TouchableOpacity } from "react-native";
import { useButtonStyles } from "./Button.style";
import { ButtonContextProps, ButtonProvider } from "../ButtonContext";
import { TouchableOpacityProps } from "react-native";

interface ButtonRootProps extends Partial<ButtonContextProps> {
  children?: React.ReactNode;
  loading?: boolean;
  full?: boolean;
  style?: StyleProp<ViewStyle>;
  props?: TouchableOpacityProps;
}

const ButtonRoot: React.FC<ButtonRootProps> = ({
  children,
  type = "default",
  variant = "sm",
  action = "default",
  alignHorizontal = "center",
  shape = "full",
  full = true,
  disabled = false,
  style,
  onPress = () => {},
  loading = false,
  props,
}) => {
  const styles = useButtonStyles({
    type,
    action,
    variant,
    alignHorizontal,
    shape,
    full,
    disabled,
  });

  return (
    <ButtonProvider
      onPress={onPress}
      type={type}
      variant={variant}
      action={action}
      shape={shape}
      alignHorizontal={alignHorizontal}
      disabled={disabled || loading }
    >
      <TouchableOpacity
        disabled={disabled || loading}
        onPress={onPress}
        style={[styles.button, style]}
        {...props}
      >
        {loading ? (
          <CircleSnail
          style={{position: "absolute"}}
          
            size={styles.spinner.fontSize}
            color={styles.spinner.color}
          />
        ) : (
          children
        )}
      </TouchableOpacity>
    </ButtonProvider>
  );
};

export default ButtonRoot;
