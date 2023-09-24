import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import useColors from "@/hooks/useColors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIcon, FlagIcon, InfoIcon, LockIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import { isAndroid } from "@/constants/Platform";
import * as WebBrowser from "expo-web-browser";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "AboutTheAppScreen"> {}

export default function AboutTheAppScreen(props: Props) {
  const colors = useColors();
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isAndroid ? colors.background : colors.modalBackground,
      }}
    >
      <Header
        title="About this app"
        hideRightButton
        hasArrowIcon
        noPaddingTop
        hasBorder
      />
      <View
        style={{
          padding: 16,
          gap: 6,
        }}
      >
        <Typography variant="body">
          This is a mobile clone of Threads by Instagram.
        </Typography>
        <View style={styles.row}>
          <Typography variant="body">Built by </Typography>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              WebBrowser.openBrowserAsync("https://github.com/OrekuD", {
                presentationStyle:
                  WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
              });
            }}
          >
            <Typography variant="body" fontWeight={600}>
              @oreku
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Typography variant="body">Web version </Typography>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              WebBrowser.openBrowserAsync(
                "https://threadsinstagram.vercel.app/",
                {
                  presentationStyle:
                    WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
                }
              );
            }}
          >
            <Typography variant="body" fontWeight={600}>
              url
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
