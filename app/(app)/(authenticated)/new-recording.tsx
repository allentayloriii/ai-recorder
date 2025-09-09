import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NewRecording = () => {
  const { uri } = useLocalSearchParams();
  console.log("NewRecording ~ uri:", uri);

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
