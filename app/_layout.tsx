import "@/global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { Platform } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing publishable key. Please set the EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable in your .env"
  );
}

const InitialLayout = () => {
  const isWeb = Platform.OS === "web";
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
