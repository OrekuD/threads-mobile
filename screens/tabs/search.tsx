import { SearchIcon } from "@/components/Icons";
import Profile from "@/components/Profile";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import hexToRGBA from "@/util/hexToRGBA";
import React from "react";
import {
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
import Recent from "@/components/Recent";
import useScreensize from "@/hooks/useScreensize";
import { isAndroid } from "@/constants/Platform";
import Store from "@/store/Store";

const list = Array(15)
  .fill(null)
  .map(() => Store.createUser());

export default function SearchScreen() {
  const { top } = useSafeAreaInsets();
  const scrollRef = React.useRef<FlatList>(null);
  const textInputRef = React.useRef<TextInput>(null);
  const colors = useColors();
  const scrollY = useSharedValue(0);
  const searchView = useSharedValue(0);
  const [search, setSearch] = React.useState("");
  const [isSearchViewVisible, setIsSearchViewVisible] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { isBigDevice, width, height } = useScreensize();

  const scrollToOffset = React.useCallback((offset: number) => {
    scrollRef.current?.scrollToOffset({ offset: offset, animated: true });
  }, []);

  const setTextInputFocus = React.useCallback((isFocused: boolean) => {
    if (isFocused) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onEndDrag: (event) => {
      if (event.contentOffset.y < 50) {
        scrollY.value = withTiming(0, { duration: 200 });
        runOnJS(scrollToOffset)(0);
      } else if (event.contentOffset.y >= 50 && event.contentOffset.y < 100) {
        scrollY.value = withTiming(100, { duration: 200 });
        runOnJS(scrollToOffset)(100);
      }
    },
  });

  const headerHeight = React.useMemo(() => top + 12 + 36 + 45, [top]);

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
  });

  const spacingAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 100],
        [0, isAndroid ? 76 : isBigDevice ? 36 : 44]
      ),
    };
  }, [isBigDevice]);

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
  });

  const headingSearchViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        scrollY.value >= 100
          ? 0
          : interpolate(searchView.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    };
  });

  const searchContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        searchView.value,
        [0, 1],
        [width - 32, (width - 32) * 0.8],
        Extrapolate.CLAMP
      ),
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
  });

  const cancelButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: searchView.value,
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
        {
          translateX: interpolate(
            searchView.value,
            [0, 1],
            [60, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const searchViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: searchView.value,
      transform: [
        {
          translateY: interpolate(
            searchView.value,
            [0, 1],
            [60, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <>
      <Animated.View
        style={[
          styles.searchView,
          {
            height: height - top - 42,
            top: top + (isAndroid ? 80 : 42),
            backgroundColor: colors.background,
            // backgroundColor: "red",
          },
          searchViewAnimatedStyle,
        ]}
        pointerEvents={isSearchViewVisible ? "auto" : "none"}
      >
        {search.trim().length === 0 ? (
          <View>
            <View style={styles.recentHeader}>
              <Typography variant="body" fontWeight={700}>
                Recent
              </Typography>
              <TouchableOpacity activeOpacity={0.5}>
                <Typography variant="sm" fontWeight={600}>
                  Clear
                </Typography>
              </TouchableOpacity>
            </View>
            <FlatList
              data={Array(4).fill("d")}
              keyExtractor={() => Math.random().toString()}
              contentContainerStyle={{}}
              renderItem={({ item }) => {
                return <Recent />;
              }}
            />
          </View>
        ) : (
          <FlatList
            data={Array(10).fill("d")}
            keyExtractor={() => Math.random().toString()}
            contentContainerStyle={{}}
            renderItem={({ item }) => {
              return <Profile user={Store.createUser()} />;
            }}
          />
        )}
      </Animated.View>
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
            style={[headingAnimatedStyle, headingSearchViewAnimatedStyle]}
          >
            <Typography variant="heading" fontWeight={700}>
              Search
            </Typography>
          </Animated.View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                Keyboard.emit;
                searchView.value = withTiming(
                  1,
                  {
                    duration: 300,
                  },
                  () => {
                    runOnJS(setIsSearchViewVisible)(true);
                    runOnJS(setTextInputFocus)(true);
                  }
                );
              }}
              style={{
                zIndex: 6,
              }}
            >
              <Animated.View
                style={[
                  styles.searchContainer,
                  {
                    backgroundColor: colors.searchToolbarBackground,
                  },
                  searchContainerAnimatedStyle,
                ]}
              >
                <SearchIcon size={20} color={hexToRGBA(colors.text, 0.5)} />
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  ref={textInputRef}
                  value={search}
                  onChangeText={setSearch}
                  editable={isSearchViewVisible}
                  pointerEvents={isSearchViewVisible ? "auto" : "none"}
                  placeholder="Search"
                  placeholderTextColor={hexToRGBA(colors.text, 0.5)}
                />
              </Animated.View>
            </TouchableOpacity>
            <Animated.View
              style={[styles.cancelButton, cancelButtonAnimatedStyle]}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 4,
                  paddingVertical: 6,
                }}
                onPress={() => {
                  runOnJS(setTextInputFocus)(false);
                  searchView.value = withTiming(
                    0,
                    {
                      duration: 300,
                    },
                    () => {
                      runOnJS(setIsSearchViewVisible)(false);
                    }
                  );
                }}
              >
                <Typography variant="body" fontWeight={500}>
                  Cancel
                </Typography>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
        <Animated.FlatList
          data={list}
          ref={scrollRef as any}
          onScroll={onScroll}
          keyExtractor={() => Math.random().toString()}
          contentContainerStyle={[
            { paddingTop: headerHeight + (isBigDevice ? 12 : 6) },
          ]}
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
            return <Profile showFollowers user={item} />;
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    marginBottom: 8,
    paddingHorizontal: 16,
    zIndex: 5,
  },
  searchContainer: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    gap: 6,
    paddingHorizontal: 10,
    marginTop: 6,
    zIndex: 4,
  },
  textInput: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: 16,
    height: "90%",
  },
  cancelButton: {
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  searchView: {
    position: "absolute",
    left: 0,
    width: "100%",
    zIndex: 100,
  },
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
});
