import { NewNote } from "@/db/schema";
import { useNotes } from "@/providers/NoteProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const NewRecording = () => {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const [transcription, setTranscription] = useState<string>("");
  const [title, setTitle] = useState<string>(
    `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { saveNote } = useNotes();

  useEffect(() => {
    handleTranscript();
  }, [uri]);

  const handleTranscript = async () => {};

  const handleSave = async () => {
    const note: NewNote = {
      id: new Date().getTime().toString(),
      title,
      note_text: transcription,
      note_audio: uri || "",
      created_at: new Date().toISOString(),
    };
  };
  return (
    <View style={styles.container}>
      <Text>NewRecording</Text>
    </View>
  );
};

export default NewRecording;

const styles = StyleSheet.create({
  container: {},
});
