import { BottomNavigationTab } from "@/types";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
import useColors from "@/hooks/useColors";

export default function TabBar(props: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const colors = useColors();
  const router = useRouter();

  const tabs: Array<BottomNavigationTab> = [
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
          paddingBottom: bottom || 4,
          height: (bottom || 4) + 60,
          backgroundColor: colors.background,
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
                <ActiveIcon size={34} color={colors.tabIconSelected} />
              ) : (
                <InActiveIcon size={34} color={colors.tabIconDefault} />
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
    paddingHorizontal: 22,
  },
  tab: {
    width: 52,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
