import useColors from "@/hooks/useColors";
import React from "react";
import { Image, View } from "react-native";

export default function ThreadImagesScreen() {
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
      <Image
        source={{ uri: "https://picsum.photos/250" }}
        style={{
          resizeMode: "contain",
          objectFit: "contain",
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}
