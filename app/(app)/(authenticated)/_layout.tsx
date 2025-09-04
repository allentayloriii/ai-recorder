import { SignOutButton } from "@/components/SignOutButton";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
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
