import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import useColors from "@/hooks/useColors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIcon, FlagIcon, InfoIcon, LockIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import useSignOutQuery from "@/hooks/queries/useSignOutQuery";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "SettingsScreen"> {}

export default function SettingsScreen(props: Props) {
  const colors = useColors();
  const { top } = useSafeAreaInsets();
  const signoutQuery = useSignOutQuery();

  const menuOptions = [
    {
      label: "Your likes",
      icon: ActivityIcon,
      onPress: () => props.navigation.navigate("YourLikesScreen"),
    },
    {
      label: "Report a problem",
      icon: FlagIcon,
      onPress: () => props.navigation.navigate("ReportAProblemScreen"),
    },
    {
      label: "About this app",
      icon: InfoIcon,
      onPress: () => props.navigation.navigate("AboutTheAppScreen"),
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: top,
      }}
    >
      <Header
        title="Settings"
        hideRightButton
        hasArrowIcon
        noPaddingTop
        hasBorder
      />
      <ScrollView>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          {menuOptions.map((option) => {
            const Icon = option.icon;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.menuOption}
                key={option.label}
                onPress={option.onPress}
              >
                <Icon size={24} color={colors.text} />
                <Typography variant="body">{option.label}</Typography>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.menuOption,
            {
              opacity: signoutQuery.isLoading ? 0.5 : 1,
              justifyContent: "space-between",
            },
          ]}
          onPress={() => signoutQuery.refetch()}
          disabled={signoutQuery.isLoading}
        >
          <Typography variant="body" color={colors.destructive}>
            Log out
          </Typography>
          {signoutQuery.isLoading ? (
            <ActivityIndicator size="small" color={colors.text} />
          ) : null}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 10,
  },
});
