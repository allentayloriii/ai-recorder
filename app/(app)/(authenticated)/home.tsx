import { Ionicons } from "@expo/vector-icons";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const Home = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();

  const startRecording = async () => {
    try {
      const permissions = await AudioModule.requestRecordingPermissionsAsync();
      console.log(
        `startRecording ~ permissions: ${JSON.stringify(permissions)}`
      );

      if (permissions.status === "granted") {
        console.log("startRecording ~ permissions granted");
      }

      await AudioModule.setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setIsRecording(true);
    } catch (error) {
      console.error("startRecording ~ error requesting permissions:", error);
    }
  };

  const stopRecording = async () => {
    if (!audioRecorder.isRecording) return;
    setIsRecording(false);

    await audioRecorder.stop();
    const uri = audioRecorder.uri;

    console.log("stopRecording ~ uri:", uri);

    if (!uri) return;

    router.push(`/new-recording?uri=${uri}`);
  };

  return (
    <View className="flex-1">
      {/* Render a list of recordings here */}
      <View className="absolute items-center self-center justify-center flex-1 w-full bottom-10">
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          className={`p-4 ${
            isRecording ? "bg-red-500" : "bg-blue-500"
          } rounded-full`}
        >
          <Ionicons name="mic" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
