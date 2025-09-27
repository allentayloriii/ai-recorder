import { Note } from "@/db/schema";
import { useNotes } from "@/providers/NoteProvider.native";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({
  note: { title, note_text, note_audio, created_at, id },
}: NoteCardProps) => {
  const { deleteNote } = useNotes();
  const player = useAudioPlayer(note_audio);
  const formattedDate = new Date(created_at).toLocaleDateString();

  const playAudio = async () => {
    await player.seekTo(0);
    await player.play();
  };

  return (
    <View className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="mb-1 text-lg font-medium text-gray-900 dark:text-gray-100">
            {title}
          </Text>
          <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </Text>
          <Text
            numberOfLines={3}
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            {note_text}
          </Text>
        </View>
        <TouchableOpacity onPress={() => deleteNote(id)} className="p-2">
          <Ionicons name="trash" size={20} className="color-red-500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playAudio} className="p-2">
          <Ionicons name="play-outline" size={20} className="color-blue-500" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteCard;
