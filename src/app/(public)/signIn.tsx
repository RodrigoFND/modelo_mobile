import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Button from "@/src/components/atom/button/Button";
import { useRef } from "react";
import Text from "@/src/components/atom/text/Text";
import { Input } from "@/src/components/atom/input/Input";
import { AuthAPI } from "@/src/services/appwrite/auth/auth.service";
import { useGoogleAuth } from "@/src/app2/t";
import AppWriteClient from "@/backend/appwrite/config/appwrite.client";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";

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

  const { isAuthenticated,login,logout,updateSession } = useAuthAppwrite();
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
    return await login(data.emailOrUsername, data.password)
      .then((x) => {
        console.log("success", x); 
      })
      .catch((e) => console.log("error", e));
  };

  const handleLogout = async () => {
    return await logout()
      .then((x) => console.log("success", x))
      .catch((e) => console.log("error", e));
  };

  const handleGetCurrentSession = async () => {
    return await updateSession()
      .then((x) => console.log("success", x))
      .catch((e) => console.log("error", e));
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ gap: 20, padding: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginBottom: 20,
            }}
          >
            SignIn
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginBottom: 20,
            }}
          >
            IsAuthenticated: {isAuthenticated ? "true" : "false"}
          </Text>

          <Controller
            control={control}
            name="emailOrUsername"
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <Input.Root
                error={errors.emailOrUsername ? true : false}
                errorMessage={errors.emailOrUsername?.message}
                variant="md"
                fullWidth={false}
                label="Email or Username"
                required={true}
                editable={disabled || !isSubmitting}
              >
                <Input.Email
                  ref={refUserEmail}
                  onChangeText={(text) => {
                    onChange(text);
                    console.log(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Email or Username"
                  secureTextEntry={false}
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => refPassword.current?.focus()}
                  submitBehavior={"newline"}
                />
              </Input.Root>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <Input.Root
                error={errors.password ? true : false}
                errorMessage={errors.password?.message}
                variant="md"
                fullWidth={false}
                label="Password"
                required={true}
                editable={disabled || !isSubmitting}
              >
                <Input.Text
                  ref={refPassword}
                  onChangeText={(text) => {
                    onChange(text);
                    console.log(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Password"
                  secureTextEntry={isPasswordHidden}
                  autoComplete="password"
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsPasswordHidden(!isPasswordHidden);
                  }}
                >
                  {isPasswordHidden ? (
                    <Input.Icon name="eye" family="Feather" />
                  ) : (
                    <Input.Icon name="eye-off" family="Feather" />
                  )}
                </TouchableOpacity>
              </Input.Root>
            )}
          />

          <Button.Root
            onPress={handleSubmit(onSubmit)}
            variant="lg"
            action="defaultInverted"
            loading={isSubmitting}
          >
            <Button.Text>Submit</Button.Text>
          </Button.Root>
          <Button.Root
            onPress={handleLogout}
            variant="lg"
            action="defaultInverted"
            loading={isSubmitting}
          >
            <Button.Text>Logout</Button.Text>
          </Button.Root>

          <Button.Root
            onPress={handleGetCurrentSession}
            variant="lg"
            action="defaultInverted"
            loading={isSubmitting}
          >
            <Button.Text>Get Current Session</Button.Text>
          </Button.Root>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
