import { Tab } from "@/types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ActivityActiveIcon,
  ActivityIcon,
  CreateIcon,
  HomeActiveIcon,
  HomeIcon,
  ProfileActiveIcon,
  ProfileIcon,
  SearchIcon,
} from "./Icons";
import { useRouter } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function TabBar(props: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const tabs: Array<Tab> = [
    {
      inActiveIcon: HomeIcon,
      activeIcon: HomeActiveIcon,
      href: "/(tabs)/",
      index: 0,
    },
    {
      inActiveIcon: SearchIcon,
      activeIcon: SearchIcon,
      href: "/(tabs)/search",
      index: 1,
    },
    {
      inActiveIcon: CreateIcon,
      activeIcon: CreateIcon,
      href: "/create",
      index: -1,
    },
    {
      inActiveIcon: ActivityIcon,
      activeIcon: ActivityActiveIcon,
      href: "/(tabs)/activity",
      index: 2,
    },
    {
      inActiveIcon: ProfileIcon,
      activeIcon: ProfileActiveIcon,
      href: "/(tabs)/profile",
      index: 3,
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottom || 20,
          height: (bottom || 20) + 60,
        },
      ]}
    >
      {tabs.map(
        ({
          activeIcon: ActiveIcon,
          inActiveIcon: InActiveIcon,
          href,
          index,
        }) => {
          const isActive = index == props.state.index;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={href}
              onPress={() => {
                router.push(href);
              }}
              style={styles.tab}
            >
              {isActive ? (
                <ActiveIcon size={34} color="#fff" />
              ) : (
                <InActiveIcon size={34} color="#4D4D4D" />
              )}
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#101010",
    paddingHorizontal: 22,
  },
  tab: {
    width: 52,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
