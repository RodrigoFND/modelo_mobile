import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, TextInput, TouchableOpacity } from "react-native";
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
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    email: z.string().regex(/^[^\s@]+$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Must be a valid email or username",
    }),
    username: z.string()
      .min(4, { message: "Username must be at least 4 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Especifica onde o erro deve aparecer
  });

export default function SignUp() {
  const { register, login } = useAuthAppwrite();
  const { navigate } = useTypedNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "teste@gmail.com",
      username: "teste",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  const refEmail = useRef<TextInput>(null);
  const refUsername = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);
  const refConfirmPassword = useRef<TextInput>(null);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onSubmit = async (data: formFields) => {
    return await register(data.email, data.password, data.username).then(async x => {
      await login(data.email, data.password);
    });
  };

  return (
    <AuthRouteTemplate
      content={
        <>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <FormInput.Root
                errorMessage={errors.email?.message}
                variant="md"
                labelText="Emai"
                required={true}
                editable={disabled || !isSubmitting}
              >
                <FormInput.Content.Email
                  ref={refEmail}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Email"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    refUsername.current?.focus();
                  }}
                />
              </FormInput.Root>
            )}
          />

<Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <FormInput.Root
                errorMessage={errors.username?.message}
                variant="md"
                labelText="Username"
                required={true}
                editable={disabled || !isSubmitting}
              >
                <FormInput.Content.Text
                  ref={refUsername}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Username"
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
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    refConfirmPassword.current?.focus();
                  }}
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <FormInput.Root
                errorMessage={errors.confirmPassword?.message}
                variant="md"
                labelText="Confirm Password"
                required={true}
                editable={disabled || !isSubmitting}
              >
                <FormInput.Content.Text
                  ref={refConfirmPassword}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={isPasswordHidden}
                  placeholder="Confirm Password"
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
            <Button.Text>Sign Up</Button.Text>
          </Button.Root>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigate({ route: "PUBLIC_SIGNIN" })}>
            <Text action="primary">Go to Sign In</Text>
          </TouchableOpacity>
        </View>

        </>
      }
    />
  );
}
