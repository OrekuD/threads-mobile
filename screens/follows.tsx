import Profile from "@/components/Profile";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import Store from "@/store/Store";
import { RootStackParamList } from "@/types";
import formatNumber from "@/util/formatNumber";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "FollowsScreen"> {}

export default function FollowsScreen(props: Props) {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const { width } = useWindowDimensions();
  const scrollRef = React.useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const activeIndicatorTranslateX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [0, width],
            [0, (width - 32) / 2]
          ),
        },
      ],
    };
  }, [width]);

  const followersOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [0, width],
        [1, 0.5],
        Extrapolate.CLAMP
      ),
    };
  }, [width]);

  const followingOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [0, width],
        [0.5, 1],
        Extrapolate.CLAMP
      ),
    };
  }, [width]);

  const followers = React.useMemo(
    () =>
      Array(props.route.params.followersCount)
        .fill(null)
        .map(() => Store.createUser()),
    [props.route.params.followersCount]
  );

  const following = React.useMemo(
    () =>
      Array(props.route.params.followingCount)
        .fill(null)
        .map(() => Store.createUser()),
    [props.route.params.followingCount]
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.modalBackground,
      }}
    >
      <View
        style={[
          styles.knob,
          {
            backgroundColor: isDarkMode ? "#575757" : "#C5C5C5",
          },
        ]}
      />
      <View
        style={[
          styles.tabs,
          {
            borderColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.tab}
          activeOpacity={0.6}
          onPress={() => {
            scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
          }}
        >
          <Animated.Text
            style={[styles.label, { color: colors.text }, followersOpacity]}
          >
            Followers
          </Animated.Text>
          <Animated.Text
            style={[styles.count, { color: colors.text }, followersOpacity]}
          >
            {formatNumber(props.route.params.followersCount)}
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          activeOpacity={0.6}
          onPress={() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          }}
        >
          <Animated.Text
            style={[styles.label, { color: colors.text }, followingOpacity]}
          >
            Following
          </Animated.Text>
          <Animated.Text
            style={[styles.count, { color: colors.text }, followingOpacity]}
          >
            {formatNumber(props.route.params.followingCount)}
          </Animated.Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              backgroundColor: colors.text,
              width: (width - 32) / 2,
            },
            activeIndicatorTranslateX,
          ]}
        />
      </View>
      <Animated.FlatList
        data={[followers, following]}
        keyExtractor={(_, index) => index.toString()}
        ref={scrollRef as any}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={onScroll}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                flex: 1,
              }}
            >
              <FlatList
                data={item}
                renderItem={({ item }) => <Profile user={item} />}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  knob: {
    marginTop: 6,
    width: 40,
    height: 6,
    borderRadius: 6 / 2,
    alignSelf: "center",
  },
  tabs: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tab: {
    width: "50%",
    paddingVertical: 16,
    alignItems: "center",
  },
  count: {
    fontSize: 12,
    fontFamily: "Inter",
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    fontFamily: "InterSemiBold",
  },
  activeIndicator: {
    position: "absolute",
    height: 2,
    bottom: -1,
    left: 16,
  },
});
