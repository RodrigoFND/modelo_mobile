import React, { useState } from "react";
import { Form, useForm, Controller } from "react-hook-form";
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
  Pressable,
} from "react-native";
import Button from "@/src/components/atom/button/Button";
import { useRef } from "react";
import Text from "@/src/components/atom/text/Text";
import Label from "../components/atom/label/Label";
import { Input } from "../components/atom/input/Input";
import TesteInput from "../components/atom/input/elements/number-input/Teste";
import { InputNumber2 } from "../components/atom/input/elements/number-input/Teste2";

type formFields = {
  email: string;
  password: string;
  myNumber: number;
};

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 8 characters" }),
  myNumber: z
    .number()
    .min(3, { message: "Number must be at least 3" })
    // Transforma qualquer valor > 4 em 4
    .transform((val) => 3),
});

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "test@test.com",
      password: "test1234",
      myNumber: 2345,
    },
  });
  const refEmail = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);
  const refInputText = useRef<TextInput>(null);

  const onSubmit = (data: formFields) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ padding: 20 }}>
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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={refEmail}
                style={{
                  borderWidth: 1,
                  borderColor: "red",
                  padding: 10,
                  marginBottom: 10,
                }}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => refPassword.current?.focus()}
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />
          {errors.email && <Text>{errors.email.message}</Text>}

          <Text>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <Input.Root
                error={errors.password ? true : false}
                errorMessage={errors.password?.message}
                variant="md"
                fullWidth={false}
                label="Teste"
                required={true}
                editable={disabled}
              >
                <Input.Icon name="star" family="Feather" />
                <Input.Text
                  ref={refPassword}
                  onChangeText={(text) => {
                    onChange(text);
                    console.log(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Password"
                  secureTextEntry={false}
                  autoComplete="password"
                  testID="password-input"
                  autoFocus={false}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => {
                    console.log("Icon clicked");
                  }}
                >
                  <Input.Icon name="star" family="Feather" />
                </TouchableOpacity>
              </Input.Root>
            )}
          />
          

          <Button.Root
            onPress={handleSubmit(onSubmit)}
            variant="lg"
            action="primary"
            type="outline"
          >
            <Button.Text>Submit</Button.Text>
            <Button.Icon name="star" family="Feather" />
          </Button.Root>

          <Button.Root
            onPress={() => setValue('password', 'teste')}
            variant="lg"
            action="primary"
            type="outline"
          >
            <Button.Text>teste</Button.Text>
            <Button.Icon name="star" family="Feather" />
          </Button.Root>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
