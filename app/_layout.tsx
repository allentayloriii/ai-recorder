import "@/global.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing publishable key. Please set the EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable in your .env"
  );
}

const InitialLayout = () => {
  const isWeb = Platform.OS === "web";
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[1] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(app)/(authenticated)/home");
    }
  }, [isLoaded, isSignedIn, router, segments]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: isWeb ? false : true,
          headerBackTitle: "",
          title: "Login",
        }}
      />
      <Stack.Screen
        name="register"
        options={{ headerShown: true, title: "Register" }}
      />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}
