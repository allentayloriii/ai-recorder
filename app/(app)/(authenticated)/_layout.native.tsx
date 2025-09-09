import { SignOutButton } from "@/components/SignOutButton";
import { NoteProvider } from "@/providers/NoteProvider";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";
// Update the import path to use a relative path if the migrations file is located at app/db/migrations.ts
import migrations from "@/drizzle/migrations";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

const Layout = () => {
  const expoDb = openDatabaseSync("voicenotes");
  useDrizzleStudio(expoDb);
  const db = drizzle(expoDb);

  const { success, error } = useMigrations(db, migrations);
  return (
    <Suspense fallback={<ActivityIndicator size="large" color="0000ff" />}>
      <SQLiteProvider
        databaseName="voicenotes"
        useSuspense
        options={{ enableChangeListener: true }}
      >
        <NoteProvider>
          <Stack>
            <Stack.Screen
              name="home"
              options={{
                title: "Voice Notes",
                headerLeft: () => <SignOutButton />,
              }}
            />
          </Stack>
        </NoteProvider>
      </SQLiteProvider>
    </Suspense>
  );
};

export default Layout;
