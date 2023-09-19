import { BottomNavigationTab, RootStackParamList } from "@/types";
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
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useColors from "@/hooks/useColors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Toasts from "./Toasts";

interface Props {
  tabbBarProps: BottomTabBarProps;
}

export default function TabBar(props: Props) {
  const { bottom } = useSafeAreaInsets();
  const navigaton =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colors = useColors();

  const tabs: Array<BottomNavigationTab> = [
    {
      inActiveIcon: HomeIcon,
      activeIcon: HomeActiveIcon,
      href: "HomeScreen",
      index: 0,
    },
    {
      inActiveIcon: SearchIcon,
      activeIcon: SearchIcon,
      href: "SearchScreen",
      index: 1,
    },
    {
      inActiveIcon: CreateIcon,
      activeIcon: CreateIcon,
      href: "CreateThreadScreen",
      index: -1,
    },
    {
      inActiveIcon: ActivityIcon,
      activeIcon: ActivityActiveIcon,
      href: "ActivityScreen",
      index: 2,
    },
    {
      inActiveIcon: ProfileIcon,
      activeIcon: ProfileActiveIcon,
      href: "ProfileScreen",
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
      <Toasts />
      {tabs.map(
        ({
          activeIcon: ActiveIcon,
          inActiveIcon: InActiveIcon,
          href,
          index,
        }) => {
          const isActive = index == props.tabbBarProps.state.index;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => {
                if (isActive && href === "HomeScreen") {
                  // uiStateContext.dispatch({ type: "UPDATE_UISTATE" }); TODO:
                }

                if (href === "CreateThreadScreen") {
                  navigaton.navigate("CreateThreadScreen", {
                    type: "new",
                  });
                } else {
                  props.tabbBarProps.navigation.navigate(href);
                }
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
