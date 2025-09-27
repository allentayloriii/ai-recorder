import { NoteProvider } from "@/providers/NoteProvider";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Layout = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  return (
    <NoteProvider>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            title: "Voice Notes",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => signOut()}
                className="p-2 mr-4 text-blue-400"
              >
                <Text>Sign Out</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="new-recording"
          options={{
            title: "New Recording",
            presentation: "modal",
            headerLeft: () => (
              <Ionicons
                onPress={() => router.back()}
                name="close"
                size={24}
                className="color-blue-500"
              />
            ),
          }}
        />
      </Stack>
    </NoteProvider>
  );
};

export default Layout;
