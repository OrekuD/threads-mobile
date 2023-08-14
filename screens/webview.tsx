import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import useColors from "@/hooks/useColors";

export default function WebViewScreen() {
  const colors = useColors();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <WebView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        source={{ uri: "https://expo.dev" }}
      />
    </View>
  );
}
