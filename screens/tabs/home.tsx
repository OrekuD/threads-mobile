import { Logo } from "@/components/Icons";
import useColors from "@/hooks/useColors";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import ThreadView from "@/components/ThreadView";
import useGetForYouTimelineQuery from "@/hooks/queries/useGetForYouTimelineQuery";
import useGetFollowingTimelineQuery from "@/hooks/queries/useGetFollowingTimelineQuery";
import useTimelineStore from "@/store/timelineStore";

export default function HomeScreen() {
  const colors = useColors();
  const [isFetchingMoreThreads, setIsFetchingMoreThreads] =
    React.useState(false);
  const scrollRef = React.useRef<FlatList>(null);
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const followingTimelineQuery = useGetFollowingTimelineQuery();
  const forYouTimelineQuery = useGetForYouTimelineQuery();
  const timelineStore = useTimelineStore();

  // React.useEffect(() => {
  //   scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
  // }, [uiStateContext.state.updatedAt]);

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

  const threads = React.useMemo(() => {
    if (timelineStore.isForYou) {
      return forYouTimelineQuery.data || [];
    }
    return followingTimelineQuery.data || [];
  }, [
    followingTimelineQuery.data,
    forYouTimelineQuery.data,
    timelineStore.isForYou,
  ]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 60], [1, 0]),
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
      <Animated.FlatList
        ListHeaderComponent={() => (
          <Animated.View
            style={[
              styles.header,
              {
                paddingTop: 12,
              },
              headerAnimatedStyle,
            ]}
          >
            <Logo size={30} color={colors.text} />
          </Animated.View>
        )}
        ref={scrollRef as any}
        data={threads}
        scrollEventThrottle={16}
        onScroll={onScroll}
        keyExtractor={({ id }) => id.toString()}
        onEndReached={() => {
          setIsFetchingMoreThreads(false);
          // setTimeout(() => {
          //   threadsContext.dispatch({ type: "ADD_THREADS" });
          // }, 500);
        }}
        renderItem={({ item }) => {
          return <ThreadView variant="list-thread" thread={item} />;
        }}
        ListFooterComponent={
          isFetchingMoreThreads
            ? () => (
                <View
                  style={{
                    paddingVertical: 32,
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="small" color={colors.text} />
                </View>
              )
            : undefined
        }
      />
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
});
