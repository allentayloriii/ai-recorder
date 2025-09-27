import { NewNote } from "@/db/schema";
import { useNotes } from "@/providers/NoteProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

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

    await saveNote(note);
    router.dismissAll();
  };
  return (
    <View className="min-h-full p-4">
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        textAlignVertical="top"
        className="p-2 mb-4 text-base bg-white border border-gray-300 rounded-lg"
      />
      <TextInput
        value={transcription}
        onChangeText={setTranscription}
        placeholder="Transcription will appear here..."
        multiline
        textAlignVertical="top"
        className="p-2 mb-4 text-base bg-white border border-gray-300 rounded-lg h-[200px]"
      />
      <TouchableOpacity
        onPress={handleSave}
        disabled={isLoading}
        className={`p-4 bg-blue-500 rounded-lg ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        <Text className="font-medium text-center text-white">
          Save Transcription
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewRecording;
