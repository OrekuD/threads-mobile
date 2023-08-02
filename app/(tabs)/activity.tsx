import { SearchIcon } from "@/components/Icons";
import Profile from "@/components/Profile";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import { NotificationTab } from "@/types";
import hexToRGBA from "@/util/hexToRGBA";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
  {
    label: "All",
    key: NotificationTab.ALL,
  },
  {
    label: "Follows",
    key: NotificationTab.FOLLOWS,
  },
  {
    label: "Replies",
    key: NotificationTab.REPLIES,
  },
  {
    label: "Mentions",
    key: NotificationTab.MENTIONS,
  },
  {
    label: "Quotes",
    key: NotificationTab.QUOTES,
  },
  {
    label: "Reposts",
    key: NotificationTab.REPOSTS,
  },
  {
    label: "Verified",
    key: NotificationTab.VERIFIED,
  },
];

export default function ActivityScreen() {
  const { top } = useSafeAreaInsets();
  const scrollRef = React.useRef<FlatList>(null);
  const colors = useColors();
  const scrollY = useSharedValue(0);
  const searchView = useSharedValue(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<NotificationTab>(
    NotificationTab.ALL
  );
  const [isFetchingData, setIsFetchingData] = React.useState(false);

  const scrollToOffset = React.useCallback((offset: number) => {
    scrollRef.current?.scrollToOffset({ offset: offset, animated: true });
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onEndDrag: (event) => {
      if (event.contentOffset.y < 50) {
        scrollY.value = withTiming(0, { duration: 300 });
        runOnJS(scrollToOffset)(0);
      } else if (event.contentOffset.y >= 50 && event.contentOffset.y < 100) {
        scrollY.value = withTiming(100, { duration: 300 });
        runOnJS(scrollToOffset)(100);
      }
    },
  });

  const headerHeight = React.useMemo(() => top + 12 + 38 + 45, [top]);

  React.useEffect(() => {
    setIsFetchingData(true);
    setTimeout(() => {
      setIsFetchingData(false);
    }, 500);
  }, [selectedTab]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 100],
            [0, -(top + 6)],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, []);

  const spacingAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 100], [0, 44]),
      // paddingTop: interpolate(searchView.value, [0, 1], [0, 44]),
    };
  }, []);

  const headingAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 100],
            [0, (top - 6) / 2],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, []);

  const headingSearchViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        scrollY.value >= 100
          ? 0
          : interpolate(searchView.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    };
  }, []);

  const tabsContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            scrollY.value >= 100
              ? 0
              : interpolate(
                  searchView.value,
                  [0, 1],
                  [0, -(top + 12)],
                  Extrapolate.CLAMP
                ),
        },
      ],
    };
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <Animated.View
          style={[
            styles.header,
            {
              paddingTop: top + 12,
              backgroundColor: colors.background,
              height: headerHeight,
            },
            headerAnimatedStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.heading,
              headingAnimatedStyle,
              headingSearchViewAnimatedStyle,
            ]}
          >
            <Typography variant="heading" fontWeight={700}>
              Activity
            </Typography>
            {isFetchingData ? (
              <ActivityIndicator size="small" color={colors.text} />
            ) : (
              <></>
            )}
          </Animated.View>

          <Animated.View
            style={[styles.tabsContainer, tabsContainerAnimatedStyle]}
          >
            <FlatList
              data={tabs}
              horizontal
              keyExtractor={({ key }) => key.toString()}
              contentContainerStyle={{
                paddingHorizontal: 16,
                gap: 6,
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                const isActiveTab = item.key === selectedTab;
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                      styles.tab,
                      {
                        backgroundColor: isActiveTab
                          ? colors.text
                          : colors.background,
                        borderColor: isActiveTab ? colors.text : colors.border,
                      },
                    ]}
                    onPress={() => setSelectedTab(item.key)}
                  >
                    <Typography
                      variant="sm"
                      fontWeight={600}
                      color={isActiveTab ? colors.background : colors.text}
                    >
                      {item.label}
                    </Typography>
                  </TouchableOpacity>
                );
              }}
            />
          </Animated.View>
        </Animated.View>
        <Animated.FlatList
          // estimatedItemSize={20}
          data={Array(20).fill("d")}
          ref={scrollRef as any}
          onScroll={onScroll}
          keyExtractor={() => Math.random().toString()}
          contentContainerStyle={[{ paddingTop: headerHeight + 6 }]}
          refreshing={isRefreshing}
          ListHeaderComponent={() => (
            <Animated.View style={[{ width: "100%" }, spacingAnimatedStyles]} />
          )}
          refreshControl={
            <RefreshControl
              progressViewOffset={headerHeight + 6}
              refreshing={isRefreshing}
              onRefresh={() => {
                setTimeout(() => {
                  setIsRefreshing(false);
                }, 1000);
              }}
            />
          }
          scrollEventThrottle={16}
          renderItem={({ item }) => {
            return <Profile showFollowers />;
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 4,
  },
  header: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    marginBottom: 8,
    zIndex: 5,
  },
  tabsContainer: {
    width: "100%",
    height: 38,
    marginTop: 6,
    zIndex: 10,
  },
  tab: {
    width: 90,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
