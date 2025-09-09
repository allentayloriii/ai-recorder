import { NoteProvider } from "@/providers/NoteProvider";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Layout = () => {
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
      </Stack>
    </NoteProvider>
  );
};

export default Layout;
