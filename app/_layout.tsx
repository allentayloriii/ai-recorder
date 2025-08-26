import "@/global.css";
import { Stack } from "expo-router";
import { Platform } from "react-native";

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
  return <InitialLayout />;
}
