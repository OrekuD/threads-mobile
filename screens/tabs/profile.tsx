import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useColors from "@/hooks/useColors";
import {
  GlobeIcon,
  HamburgerIcon,
  InstagramIcon,
  Logo,
} from "@/components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Typography from "@/components/Typography";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import BottomSheet from "@/components/BottomSheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import useScreensize from "@/hooks/useScreensize";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { RootStackParamList } from "@/types";
import { useUserContext } from "@/context/UserContext";
import { faker } from "@faker-js/faker";
import formatNumber from "@/util/formatNumber";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

interface Props extends NativeStackScreenProps<RootStackParamList> {}

export default function ProfileScreen(props: Props) {
  const colors = useColors();
  const { top } = useSafeAreaInsets();
  const isDarkMode = useIsDarkMode();
  const [isThreadsBottomSheetOpen, setIsThreadsBottomSheetOpen] =
    React.useState(false);
  const scrollY = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const { width } = useScreensize();
  const scrollXRef = React.useRef<ScrollView>(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const userContext = useUserContext();

  const user = React.useMemo(
    () => userContext.state.user,
    [userContext.state.user]
  );

  const onScrollY = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const onScrollX = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const tabsAnimatedStyle = useAnimatedStyle(() => {
    const offset = headerHeight > 0 ? headerHeight - top * 0.7 : top + 177;
    return {
      transform: [
        {
          translateY: scrollY.value >= offset ? -offset + scrollY.value : 0,
        },
      ],
    };
  }, [top, headerHeight]);

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

  const threadsTabTextnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [0, width],
        [1, 0.5],
        Extrapolate.CLAMP
      ),
    };
  });

  const repliesTabTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [0, width],
        [0.5, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const openInstagram = React.useCallback(async () => {
    try {
      const canOpenURL = await Linking.canOpenURL(
        "https://www.instagram.com/oreku__"
      );
      if (canOpenURL) {
        Linking.openURL("https://www.instagram.com/oreku__");
      } else {
        Alert.alert("Error", "Could not open Instagram");
      }
    } catch (error) {
      Alert.alert("Error", "Could not open Instagram");
    }
  }, []);

  return (
    <>
      <BottomSheet
        height={250}
        isOpen={isThreadsBottomSheetOpen}
        onClose={() => setIsThreadsBottomSheetOpen(false)}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-between",
                paddingVertical: 16,
              },
            ]}
          >
            <Typography variant="title" fontWeight={700}>
              threads.net
            </Typography>
            <View style={styles.logoContainer}>
              <Logo size={34} color="#fff" />
            </View>
          </View>
          <Typography variant="sm" color="secondary">
            Soon, you'll be able to follow and interact with people on other
            fediverse platforms, such as Mastodon. They can also find you with
            your full username,
          </Typography>
          <Typography variant="sm" color="secondary" fontWeight={700}>
            @{user?.username}@threads.net.
          </Typography>
        </View>
      </BottomSheet>
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: colors.background,
            height: top,
          },
        ]}
      />
      <AnimatedScrollView
        style={{
          backgroundColor: colors.background,
        }}
        scrollEventThrottle={16}
        onScroll={onScrollY}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 16,
          }}
          onLayout={(e) => {
            setHeaderHeight(e.nativeEvent.layout.height);
          }}
        >
          <View
            style={[
              styles.header,
              {
                paddingTop: top + 12,
              },
            ]}
          >
            <TouchableOpacity activeOpacity={0.8}>
              <GlobeIcon size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginLeft: "auto",
              }}
              onPress={openInstagram}
            >
              <InstagramIcon size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => userContext.dispatch({ type: "SIGN_OUT" })}
            >
              <HamburgerIcon size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.details}>
            <View>
              <Typography variant="title" fontWeight={700} lineLimit={1}>
                {user?.username}
              </Typography>
              <View
                style={[
                  styles.row,
                  {
                    marginTop: 2,
                  },
                ]}
              >
                <Typography variant="body" lineLimit={1}>
                  {user?.username}
                </Typography>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.pill,
                    {
                      backgroundColor: isDarkMode ? "#1E1E1E" : "#F5F5F5",
                    },
                  ]}
                  onPress={() => setIsThreadsBottomSheetOpen(true)}
                >
                  <Typography
                    variant="tiny"
                    color={isDarkMode ? "#7A7A7A" : "#959595"}
                    style={{
                      lineHeight: undefined,
                    }}
                  >
                    threads.net
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={
                user?.avatar
                  ? { uri: user.avatar }
                  : require("../../assets/images/no-avatar.jpeg")
              }
              style={styles.avatar}
            />
          </View>
          {Boolean(user?.bio) ? (
            <Typography
              variant="sm"
              style={{
                marginTop: 8,
              }}
            >
              {user?.bio}
            </Typography>
          ) : (
            <></>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              props.navigation.navigate("FollowsScreen", {
                followersCount: user?.followersCount || 0,
                followingCount: user?.followingCount || 0,
              })
            }
            style={[
              styles.row,
              {
                marginVertical: 12,
                gap: 12,
                alignSelf: "flex-start",
              },
            ]}
          >
            <View
              style={[
                styles.row,
                {
                  gap: -8,
                },
              ]}
            >
              {Array(3)
                .fill("d")
                .map((_, index) => {
                  return (
                    <Image
                      source={{
                        uri: faker.internet.avatar(),
                      }}
                      style={[
                        styles.smallAvatar,
                        {
                          borderColor: colors.background,
                        },
                      ]}
                      key={index}
                    />
                  );
                })}
            </View>
            <Typography variant="sm" color="secondary">
              {formatNumber(user?.followersCount || 0)} followers
            </Typography>
          </TouchableOpacity>
          <View
            style={[
              styles.row,
              {
                gap: 12,
                height: 36,
                marginTop: 8,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.button,
                {
                  borderColor: colors.border,
                },
              ]}
              onPress={() => props.navigation.navigate("EditProfileScreen")}
            >
              <Typography variant="sm" fontWeight={600}>
                Edit profile
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.button,
                {
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                Share.share({
                  url: "https://threads.net/@oreku__",
                });
              }}
            >
              <Typography variant="sm" fontWeight={600}>
                Share profile
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={[
            styles.tabs,
            {
              borderBottomColor: colors.border,
              zIndex: 11,
              backgroundColor: colors.background,
            },
            tabsAnimatedStyle,
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
              scrollXRef.current?.scrollTo({ animated: true, x: 0 });
            }}
          >
            <Animated.Text
              style={[
                styles.text,
                {
                  color: colors.text,
                },
                threadsTabTextnimatedStyle,
              ]}
            >
              Threads
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
                repliesTabTextAnimatedStyle,
              ]}
            >
              Replies
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
        <AnimatedScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollX}
          scrollEventThrottle={16}
          ref={scrollXRef as any}
        >
          <View style={{ width }}>
            {Array(100)
              .fill("d")
              .map((_, index) => (
                <Typography variant="sm" key={index}>
                  {index}
                </Typography>
              ))}
          </View>
          <View style={{ width }}>
            {Array(100)
              .fill("d")
              .map((_, index) => (
                <Typography variant="sm" key={index}>
                  {index}sd
                </Typography>
              ))}
          </View>
        </AnimatedScrollView>
      </AnimatedScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  details: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 26,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  pill: {
    height: 26,
    borderRadius: 26 / 2,
    paddingHorizontal: 8,
    justifyContent: "center",
    marginLeft: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    resizeMode: "cover",
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  smallAvatar: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    resizeMode: "cover",
    borderWidth: 3,
  },
  button: {
    flex: 1,
    height: "100%",
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabs: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    position: "relative",
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontFamily: "InterSemiBold",
  },
  activeIndicator: {
    position: "absolute",
    left: 16,
    bottom: -1,
    width: "50%",
    height: 1.64,
  },
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    zIndex: 10,
  },
});
