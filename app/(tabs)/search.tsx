import React from "react";
import { Text, View } from "react-native";

export default function SearchScreen() {
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
        Search
      </Text>
    </View>
  );
}
