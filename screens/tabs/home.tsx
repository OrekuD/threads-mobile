import { Logo } from "@/components/Icons";
import useColors from "@/hooks/useColors";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import ThreadView from "@/components/ThreadView";
import useGetForYouTimelineQuery from "@/hooks/queries/useGetForYouTimelineQuery";
import useGetFollowingTimelineQuery from "@/hooks/queries/useGetFollowingTimelineQuery";
import useTimelineStore from "@/store/timelineStore";
import useScreensize from "@/hooks/useScreensize";

export default function HomeScreen() {
  const colors = useColors();
  const [isFetchingMoreThreads, setIsFetchingMoreThreads] =
    React.useState(false);
  const scrollXRef = React.useRef<ScrollView>(null);
  const { top } = useSafeAreaInsets();
  const scrollX = useSharedValue(0);
  const followingTimelineQuery = useGetFollowingTimelineQuery();
  const forYouTimelineQuery = useGetForYouTimelineQuery();
  const timelineStore = useTimelineStore();
  const { width } = useScreensize();

  const isLoading = React.useMemo(() => {
    if (timelineStore.isForYou) {
      return forYouTimelineQuery.isLoading;
    }
    return followingTimelineQuery.isLoading;
  }, [
    followingTimelineQuery.isLoading,
    forYouTimelineQuery.isLoading,
    timelineStore.isForYou,
  ]);

  const onScrollX = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const activeTabIndicatorAnimatedStyle = useAnimatedStyle(() => {
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
  });

  const forYouTabTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [0, width],
        [1, 0.5],
        Extrapolate.CLAMP
      ),
    };
  });

  const followingTabTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [0, width],
        [0.5, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={[
            styles.header,
            {
              paddingTop: top + 12,
            },
          ]}
        >
          <Logo size={30} color={colors.text} />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="small" color={colors.text} />
        </View>
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
      <View style={{ width: "100%", height: top }} />
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Logo size={30} color={colors.text} />
          <View
            style={[
              styles.tabs,
              {
                borderBottomColor: colors.border,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.activeIndicator,
                {
                  backgroundColor: colors.text,
                },
                activeTabIndicatorAnimatedStyle,
              ]}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.tab}
              onPress={() => {
                // scrollXRef.current?.scrollTo({ animated: true, x: 0 });
              }}
            >
              <Animated.Text
                style={[
                  styles.text,
                  {
                    color: colors.text,
                  },
                  forYouTabTextAnimatedStyle,
                ]}
              >
                For you
              </Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.tab}
              onPress={() => {
                scrollXRef.current?.scrollToEnd({ animated: true });
              }}
            >
              <Animated.Text
                style={[
                  styles.text,
                  {
                    color: colors.text,
                  },
                  followingTabTextAnimatedStyle,
                ]}
              >
                Following
              </Animated.Text>
            </TouchableOpacity>
          </View>
        </View>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            forYouTimelineQuery.data || [],
            followingTimelineQuery.data || [],
          ]}
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={onScrollX}
          ref={scrollXRef as any}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width,
                  height: "100%",
                }}
              >
                <FlatList
                  data={item}
                  scrollEventThrottle={16}
                  keyExtractor={({ threadId }) => threadId}
                  renderItem={({ item }) => {
                    return <ThreadView thread={item} variant="list-thread" />;
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  tabs: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    position: "relative",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "InterSemiBold",
  },
  activeIndicator: {
    position: "absolute",
    left: 16,
    bottom: -1,
    width: "50%",
    height: 1.64,
  },
});
