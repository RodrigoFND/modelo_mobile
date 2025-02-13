import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Button from "@/src/components/atom/button/Button";
import { useRef } from "react";
import Text from "@/src/components/atom/text/Text";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import FormInput from "@/src/components/molecule/form/form-input";
import AuthRouteTemplate from "@/src/components/template/AuthRouteTemplate";
import { useTypedNavigation } from "@/src/hooks/auth/useTypedNavigation";
/* forios -  11195953346-mlog0out7hg9ior8pptb76ik5dscetph.apps.googleusercontent.com */
/* forandroid - 11195953346-e82kjuiknd48cfb2mjj31ifksoctpgvq.apps.googleusercontent.com */

type formFields = {
  emailOrUsername: string;
  password: string;
};

const schema = z.object({
  emailOrUsername: z.string().regex(/^[^\s@]+$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: "Must be a valid email or username",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function SignIn() {
  const { isAuthenticated, login, logout, updateSession } = useAuthAppwrite();
  const { navigate } = useTypedNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailOrUsername: "rodrigo@gmail.com",
      password: "12345678",
    },
  });

  const refUserEmail = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onSubmit = async (data: formFields) => {
    return await login(data.emailOrUsername, data.password);
  };

  return (
    <AuthRouteTemplate
      content={
        <>
          <Controller
            control={control}
            name="emailOrUsername"
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <FormInput.Root
                errorMessage={errors.emailOrUsername?.message}
                variant="md"
                labelText="Email or Username"
                required={true}
                editable={disabled || !isSubmitting}
              >
               
                <FormInput.Content.Email
                  ref={refUserEmail}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Email or Username"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    refPassword.current?.focus();
                  }}
                />
             
              </FormInput.Root>
            )}
          />

          

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <FormInput.Root
                errorMessage={errors.password?.message}
                variant="md"
                labelText="Password"
                required={true}
                editable={disabled || !isSubmitting}
              >
                <FormInput.Content.Text
                  ref={refPassword}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={isPasswordHidden}
                  placeholder="Password"
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsPasswordHidden(!isPasswordHidden);
                  }}
                >
                  {isPasswordHidden ? (
                    <FormInput.Icon name="eye" family="Feather" />
                  ) : (
                    <FormInput.Icon name="eye-off" family="Feather" />
                  )}
                </TouchableOpacity>
              </FormInput.Root>
            )}
          />

          <Button.Root
            onPress={handleSubmit(onSubmit)}
            variant="lg"
            action="defaultInverted"
            loading={isSubmitting}
          >
            <Button.Text>Sign In</Button.Text>
          </Button.Root>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text >Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigate({ route: "PUBLIC_SIGNUP" })}>
            <Text action="primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
        </>
      }
    />
  );
}
