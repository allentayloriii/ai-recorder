import { SignOutButton } from "@/components/SignOutButton";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Layout = () => {
  const { signOut } = useAuth();

  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ title: "Voice Notes", headerLeft: () => <SignOutButton /> }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {},
});
