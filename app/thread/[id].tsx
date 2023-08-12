import { ChevronLeftIcon } from "@/components/Icons";
import Thread from "@/components/Thread";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import { isAndroid } from "@/constants/Platform";
import Header from "@/components/Header";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ThreadScreen() {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const { top, bottom } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const press = useSharedValue(0);
  const router = useRouter();

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        scrollY.value,
        [0, 100],
        ["transparent", colors.border]
      ),
    };
  }, [colors.border]);

  const replyToAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(press.value, [0, 1], [1, isAndroid ? 0.9 : 0.98]),
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {isAndroid ? (
        <Header title="Thread" hideRightButton hasBorder hasArrowIcon />
      ) : (
        <Animated.View
          style={[
            styles.header,
            {
              paddingTop: top + 14,
            },
            headerAnimatedStyle,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.backButton}
            onPress={router.back}
          >
            <ChevronLeftIcon size={10} color={colors.text} />
            <Typography variant="body2" fontWeight={500}>
              Back
            </Typography>
          </TouchableOpacity>
          <Typography variant="body2" fontWeight={700}>
            Thread
          </Typography>
        </Animated.View>
      )}
      <Animated.FlatList
        ListHeaderComponent={() => <Thread variant="thread" />}
        scrollEventThrottle={16}
        onScroll={onScroll}
        data={Array(3).fill("d")}
        renderItem={({ item }) => {
          return <Thread variant="reply" />;
        }}
      />
      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottom + 16,
            borderColor: colors.border,
          },
        ]}
      >
        <AnimatedPressable
          onPressIn={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            press.value = withTiming(1, {
              duration: 200,
            });
          }}
          onPressOut={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            press.value = withTiming(0, {
              duration: 200,
            });
          }}
          onPress={() => {}}
          style={[
            styles.replyTo,
            {
              backgroundColor: isDarkMode ? "#1E1E1E" : "#F5F5F5",
            },
            replyToAnimatedStyle,
          ]}
        >
          <Image
            source={{
              uri: "https://picsum.photos/seed/picsum/24/24",
            }}
            style={styles.avatar}
          />
          <Typography variant="body" color={isDarkMode ? "#767676" : "#989899"}>
            Reply to onefootball
          </Typography>
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 14,
    bottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  replyTo: {
    width: "100%",
    height: 42,
    borderRadius: 42 / 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 12,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
});
