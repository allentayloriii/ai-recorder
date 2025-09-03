import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import * as z from "zod";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function Index() {
  const [loading, setLoading] = useState(false);
  const { startSSOFlow } = useSSO();
  const { signIn, setActive, isLoaded } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      console.log("signInAttempt", signInAttempt);

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        if (Platform.OS === "web") {
          alert("Failed to sign in");
        } else {
          Alert.alert("Error", "Failed to sign in");
        }
      }
    } catch (err) {
      if (Platform.OS === "web") {
        alert("Failed to sign in");
      } else {
        Alert.alert("Error", "Failed to sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithApple = async () => {
    console.log("Sign in with Apple");

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_apple",
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleSignInWithGoogle = async () => {
    console.log("Sign in with Google");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View className="items-center justify-center flex-1 px-4 bg-white">
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="w-full max-w-md">
          <View className="mb-8">
            <Text className="mb-2 text-3xl font-bold text-gray-800">
              Welcome to Galaxies
            </Text>
            <Text className="text-gray-600">Sign in to continue</Text>
          </View>

          <View className="w-full gap-2 space-y-4">
            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.email && (
                <Text className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Password"
                    secureTextEntry
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.password && (
                <Text className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <Pressable
              className="w-full py-4 duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text className="font-semibold text-center text-white">
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </Pressable>

            <Link href="/register" asChild>
              <Pressable className="w-full">
                <Text className="text-center text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Text className="font-semibold text-blue-600">
                    Create one
                  </Text>
                </Text>
              </Pressable>
            </Link>

            <View className="flex-row items-center my-4">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-4 text-gray-500">or</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            <Pressable
              className="flex-row items-center justify-center w-full py-3 duration-300 bg-black rounded-lg hover:cursor-pointer hover:bg-gray-800"
              onPress={handleSignInWithApple}
            >
              <Ionicons
                name="logo-apple"
                size={24}
                color="white"
                className="mr-2"
              />
              <Text className="ml-2 font-semibold text-center text-white">
                Sign in with Apple
              </Text>
            </Pressable>

            <Pressable
              className="flex-row items-center justify-center w-full py-3 duration-300 bg-black rounded-lg hover:cursor-pointer hover:bg-gray-800"
              onPress={handleSignInWithGoogle}
            >
              <Ionicons
                name="logo-google"
                size={24}
                color="white"
                className="mr-2"
              />
              <Text className="ml-2 font-semibold text-center text-white">
                Sign in with Google
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
