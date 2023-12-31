import { ChevronLeftIcon } from "@/components/Icons";
import ThreadView from "@/components/ThreadView";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import React from "react";
import {
  ActivityIndicator,
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
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import useGetThreadQuery from "@/hooks/queries/useGetThreadQuery";
import Thread from "@/models/Thread";

const placeholder: Thread = {
  id: 0,
  threadId: "",
  text: "",
  media: [],
  user: null,
  replyTheadId: null,
  quoteTheadId: null,
  replyThead: null,
  quoteThead: null,
  replies: [],
  quotes: [],
  likesCount: 0,
  isLikesHidden: false,
  hasCurrentUserLiked: false,
  hasCurrentUserReposted: false,
  createdAt: "",
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props
  extends NativeStackScreenProps<RootStackParamList, "ThreadScreen"> {}

export default function ThreadScreen(props: Props) {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const { top, bottom } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const press = useSharedValue(0);
  const navigation = useNavigation();
  const threadQuery = useGetThreadQuery(props.route.params.thread.threadId);

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

  // if (threadQuery.isLoading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: "center",
  //         justifyContent: "center",
  //         backgroundColor: colors.background,
  //       }}
  //     >
  //       <ActivityIndicator size="small" color={colors.text} />
  //     </View>
  //   );
  // }

  if (!threadQuery.data && !threadQuery.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <Typography variant="sm" fontWeight={600}>
          Thread not found
        </Typography>
      </View>
    );
  }

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
            onPress={navigation.goBack}
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
        ListHeaderComponent={() => (
          <ThreadView variant="thread" thread={props.route.params.thread} />
        )}
        scrollEventThrottle={16}
        onScroll={onScroll}
        data={threadQuery?.data?.replies || [placeholder]}
        renderItem={({ item }) => {
          if (threadQuery.isLoading) {
            return (
              <View
                style={{
                  paddingTop: 32,
                  alignItems: "center",
                  backgroundColor: colors.background,
                }}
              >
                <ActivityIndicator size="small" color={colors.text} />
              </View>
            );
          }
          return <ThreadView variant="reply" thread={item} />;
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
            if (!isAndroid) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            press.value = withTiming(1, {
              duration: 200,
            });
          }}
          onPressOut={() => {
            if (!isAndroid) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            press.value = withTiming(0, {
              duration: 200,
            });
          }}
          onPress={() => {
            props.navigation.navigate("CreateThreadScreen", {
              thread: props.route.params.thread,
              type: "reply",
            });
          }}
          style={[
            styles.replyTo,
            {
              backgroundColor: isDarkMode ? "#1E1E1E" : "#F5F5F5",
            },
            replyToAnimatedStyle,
          ]}
        >
          <Image
            source={
              props.route.params.thread.user?.profile?.profilePicture
                ? {
                    uri: props.route.params.thread.user?.profile
                      ?.profilePicture,
                  }
                : require("../assets/images/no-avatar.jpeg")
            }
            style={styles.avatar}
          />
          <Typography variant="body" color={isDarkMode ? "#767676" : "#989899"}>
            Reply to {props.route.params.thread.user?.username}
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
