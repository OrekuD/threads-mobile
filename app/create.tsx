import useColors from "@/hooks/useColors";
import React from "react";
import { Text, TextInput, View } from "react-native";

export default function CreateScreen() {
  const colors = useColors();
  return (
    <View
      style={{
        backgroundColor: colors.modalBackground,
        flex: 1,
      }}
    >
      <TextInput placeholder="Ggggg" autoFocus />
    </View>
  );
}
