import React from "react";
import { StyleProp, ViewStyle, ActivityIndicator } from "react-native";
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
      disabled={disabled}
    >
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, style]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size={variant === "lg" ? "large" : "small"}
            color={"white"}
          />
        ) : (
          children
        )}
      </TouchableOpacity>
    </ButtonProvider>
  );
};

export default ButtonRoot;
