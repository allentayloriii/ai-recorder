import { NewNote } from "@/db/schema";
import { useNotes } from "@/providers/NoteProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const NewRecording = () => {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const [transcription, setTranscription] = useState<string>("");
  const [title, setTitle] = useState<string>(
    `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { saveNote } = useNotes();

  async function uploadRecording(fileUri: string) {
    const uploadUrl = "http://localhost:8081/api/speech-to-text";

    const form = new FormData();
    form.append("file", {
      uri: fileUri,
      name: "recording.m4a",
      type: "audio/m4a",
    } as any); // cast to any for TypeScript

    // IMPORTANT: do NOT set Content-Type; RN/fetch will set the multipart boundary
    const resp = await fetch(uploadUrl, {
      method: "POST",
      body: form,
    });

    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`Upload failed: ${resp.status} ${errText}`);
    }
    return await resp.json();
  }

  useEffect(() => {
    const handleTranscript = async () => {
      if (!uri) return;
      setIsLoading(true);
      try {
        if (Platform.OS === "web") {
          const response = await fetch(uri);
          const blob = await response.blob();

          const formData = new FormData();
          formData.append("file", blob, "recording.m4a");

          const apiResponse = await fetch(
            "https://localhost:8081/api/speech-to-text+api",
            {
              method: "POST",
              body: formData,
            }
          ).then((res) => res.json());
          
          console.log(apiResponse);
          setTranscription(apiResponse.text || "No transcription available");
        } else {
          const uploadResult = await uploadRecording(uri);
          console.log(uploadResult);
          const transcription = JSON.parse(uploadResult.body).text;
          setTranscription(transcription || "No transcription available");
        }
      } catch (e) {
        console.error("Error uploading recording:", e);
        setTranscription("Error during transcription");
      } finally {
        setIsLoading(false);
      }
    };

    handleTranscript();
  }, [uri]);

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
