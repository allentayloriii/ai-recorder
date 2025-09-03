import { useSignUp } from "@clerk/clerk-expo";
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
  TouchableOpacity,
  View,
} from "react-native";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof schema>;

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "adonis@abc.com",
      password: "Test12345",
      name: "Adonis",
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

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        if (Platform.OS === "web") {
          alert("Failed to sign in");
        } else {
          Alert.alert("Error", "Failed to sign in");
        }
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      if (Platform.OS === "web") {
        alert("Failed to sign in");
      } else {
        Alert.alert("Error", "Failed to sign in");
      }
    }

    setLoading(false);
  };

  return (
    <View className="items-center justify-center flex-1 px-4 bg-white">
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="w-full max-w-md">
          <Text className="mb-8 text-3xl font-bold text-center text-gray-800">
            Create Account
          </Text>

          <View className="gap-2 space-y-4">
            <View>
              <Text className="mb-2 text-gray-700">Name</Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Enter name"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-red-500">{errors.name.message}</Text>
              )}
            </View>

            <View>
              <Text className="mb-2 text-gray-700">Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Enter email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500">{errors.email.message}</Text>
              )}
            </View>

            <View>
              <Text className="mb-2 text-gray-700">Password</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500">{errors.password.message}</Text>
              )}
            </View>

            <Pressable
              className="w-full py-4 duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="font-semibold text-center text-white">
                Register
              </Text>
            </Pressable>

            <Link href="/" asChild>
              <TouchableOpacity className="mt-4">
                <Text className="text-center text-blue-500">
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
    </View>
  );
}
