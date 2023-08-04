import React from "react";
import { Platform, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import useColors from "@/hooks/useColors";

export default function ProfileScreen() {
  const colors = useColors();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        Profile
      </Text>
      <BlurView
        intensity={10}
        style={{
          width: 200,
          height: 200,
          position: "absolute",
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Profile
        </Text>
      </BlurView>
    </View>
  );
}
