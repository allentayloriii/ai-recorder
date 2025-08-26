import "@/global.css";
import { Stack } from "expo-router";
import { Platform } from "react-native";

const InitialLayout = () => {
  const isWeb = Platform.OS === "web";
  return (
    <Stack>
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{ headerShown: isWeb, headerBackTitle: "" }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return <InitialLayout />;
}
