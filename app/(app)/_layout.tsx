import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Slot, useSegments } from "expo-router";
import React from "react";

const Layout = () => {
  const { isSignedIn } = useAuth();
  const segments = useSegments();

  const inAuthGroup = segments[1] === "(authenticated)";
  if (!isSignedIn && inAuthGroup) {
    return <Redirect href="/" />;
  }
  return <Slot />;
};

export default Layout;
