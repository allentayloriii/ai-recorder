import { useNotes } from "@/providers/NoteProvider";
import { useAudioPlayer } from "expo-audio";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams();
  const { notes } = useNotes();
  const note = notes.find((n) => n.id === id);
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useAudioPlayer(note?.note_audio);

  const handlePlayPause = async () => {
    await player.seekTo(0);
    await player.play();
  };

  if (!note) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-lg text-gray-500">Note not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4">
      <Stack.Screen options={{ title: note.title ?? "Note" }} />
      <View className="p-4">
        <Text className="mb-2 text-2xl font-bold">{note.title}</Text>
        <Text className="mb-4 text-sm text-gray-500">
          {new Date(note.created_at).toLocaleString()}
        </Text>
        {note.note_audio ? (
          <TouchableOpacity
            onPress={handlePlayPause}
            className="w-32 p-3 mb-4 bg-blue-500 rounded-lg"
          >
            <Text className="text-center text-white">
              {isPlaying ? "Pause Audio" : "Play Audio"}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Text className="text-base leading-relaxed text-gray-800">
          {note.note_text}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Page;
