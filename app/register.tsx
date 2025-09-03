import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
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
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required").max(100),
});

type FormData = z.infer<typeof schema>;

export default function Index() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Adonis",
      email: "adonis@galaxies.dev",
      password: "Test12345",
    },
    mode: "onChange",
  });

  const onSubmit = async ({ email, password, name }: FormData) => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signUpAttempt = await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
      });
      console.log("signing up");
      console.log(signUpAttempt);
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(JSON.stringify(signUpAttempt, null, 2));
        if (Platform.OS === "web") {
          alert("Sign up not complete. Please try again.");
        } else {
          Alert.alert("Error", "Sign up not complete. Please try again.");
        }
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      if (Platform.OS === "web") {
        alert("Sign up not complete. Please try again.");
      } else {
        Alert.alert("Error", "Sign up not complete. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="items-center justify-center flex-1 px-4 bg-white">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View className="w-full max-w-md">
          <View>
            <Text className="mb-2 text-2xl font-bold text-gray-800">
              Create Your Account
            </Text>
          </View>

          <View className="gap-2 mt-8 space-y-4">
            <View>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="words"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                  />
                )}
              />
              {errors.name && (
                <Text className="px-2 mt-1 text-sm text-red-500">
                  {errors.name.message}
                </Text>
              )}
            </View>
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
              <Text className="px-4 py-3 text-sm font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                {loading ? "Loading..." : "Sign Up"}
              </Text>
            </Pressable>

            <Link href="/" asChild>
              <Pressable className="w-full">
                <Text className="px-4 py-3 text-sm font-semibold text-center text-gray-600 ">
                  Already have an account?{" "}
                  <Text className="font-bold text-blue-600">Sign In</Text>
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      )}
    </View>
  );
}
