import React from "react";
import { Text, View } from "react-native";

export default function ActivityScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        Activity
      </Text>
    </View>
  );
}
