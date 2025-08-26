import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required").max(100),
});

type FormData = z.infer<typeof schema>;

export default function Index() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleSignInWithGoogle = () => {
    console.log("Sign in with Google");
  };

  const handleSignInWithApple = () => {
    console.log("Sign in with Apple");
  };

  return (
    <View className="items-center justify-center flex-1 px-4 bg-white">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View className="w-full max-w-md">
          <View>
            <Text className="mb-2 text-2xl font-bold text-gray-800">
              Welcome to the AI Recorder App
            </Text>
            <Text className="mb-4 text-gray-600">
              Please sign in to continue.
            </Text>
          </View>

          <View className="gap-2 mt-8 space-y-4">
            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                  />
                )}
              />
              {errors.email && (
                <Text className="px-2 mt-1 text-sm text-red-500">
                  {errors.email.message}
                </Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize="none"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                  />
                )}
              />
              {errors.password && (
                <Text className="px-2 mt-1 text-sm text-red-500">
                  {errors.password.message}
                </Text>
              )}
            </View>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={loading || !isValid}
              className="mt-6"
            >
              <Text className="px-4 py-3 text-sm font-semibold text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </Pressable>

            <Link href="/register" asChild>
              <Pressable className="w-full">
                <Text className="px-4 py-3 text-sm font-semibold text-center text-gray-600 ">
                  Don&apos;t have an account?{" "}
                  <Text className="font-bold text-blue-600">Sign up</Text>
                </Text>
              </Pressable>
            </Link>

            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="px-2 text-gray-500">or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <Pressable className="flex-row items-center justify-center w-full py-3 mb-2 duration-300 bg-black rounded-lg hover:bg-gray-700">
              <Ionicons
                name="logo-apple"
                size={24}
                color="white"
                className="mr-2"
              />
              <Text className="text-sm font-semibold text-center text-white">
                Sign in with Apple
              </Text>
            </Pressable>
            <Pressable className="flex-row items-center justify-center w-full py-3 mb-2 duration-300 bg-black rounded-lg hover:bg-gray-700">
              <Ionicons
                name="logo-google"
                size={24}
                color="white"
                className="mr-2"
              />
              <Text className="text-sm font-semibold text-center text-white">
                Sign in with Google
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
