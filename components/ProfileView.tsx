import React from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import useColors from "@/hooks/useColors";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  GlobeIcon,
  HamburgerIcon,
  InstagramIcon,
  Logo,
  MoreIcon,
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { RootStackParamList } from "@/types";
import formatNumber from "@/utils/formatNumber";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { isAndroid } from "@/constants/Platform";
import User from "@/models/User";
import useUserStore from "@/store/userStore";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

interface Props {
  user: User;
  isModal?: boolean;
}

export default function ProfileView(props: Props) {
  const colors = useColors();
  const { top } = useSafeAreaInsets();
  const isDarkMode = useIsDarkMode();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isThreadsBottomSheetOpen, setIsThreadsBottomSheetOpen] =
    React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const scrollY = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const user = useUserStore((state) => state.user);
  const { width, height } = useScreensize();
  const scrollXRef = React.useRef<ScrollView>(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);

  const isCurrentUser = React.useMemo(
    () => props.user.id === user?.id,
    [user?.id, props.user.id]
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
            [0, width, width * 2],
            [0, (width - 32) / 3, ((width - 32) / 3) * 2]
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
        [0, width, width * 2],
        [0.5, 1, 0.5],
        Extrapolate.CLAMP
      ),
    };
  });

  const repostsTabTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [width, width * 2],
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
            @{props.user.username}@threads.net.
          </Typography>
        </View>
      </BottomSheet>

      {isCurrentUser ? (
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: colors.background,
              height: top,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.background,
              paddingTop: props.isModal ? 24 : top + 12,
              paddingHorizontal: 16,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.backButton}
            onPress={navigation.goBack}
          >
            {isAndroid ? (
              <ArrowLeftIcon size={24} color={colors.text} />
            ) : (
              <>
                <ChevronLeftIcon size={10} color={colors.text} />
                <Typography variant="body2" fontWeight={500}>
                  Back
                </Typography>
              </>
            )}
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
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <MoreIcon size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      )}
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
            setHeaderHeight(
              isCurrentUser
                ? e.nativeEvent.layout.height
                : e.nativeEvent.layout.height + top - (isAndroid ? 0 : 6)
            );
          }}
        >
          {isCurrentUser ? (
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
                // onPress={() => userContext.dispatch({ type: "SIGN_OUT" })}
              >
                <HamburgerIcon size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.details}>
            <View
              style={{
                flex: 1,
                paddingRight: 24,
              }}
            >
              <Typography variant="title" fontWeight={700} lineLimit={2}>
                {props.user.name}
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
                  {props.user.username}
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
                props.user.profile?.profilePicture
                  ? { uri: props.user.profile.profilePicture }
                  : require("../assets/images/no-avatar.jpeg")
              }
              style={styles.avatar}
            />
          </View>
          {Boolean(props.user.profile?.bio) ? (
            <Typography
              variant="sm"
              style={{
                marginTop: 8,
              }}
            >
              {props.user.profile!.bio}
            </Typography>
          ) : (
            <></>
          )}
          <View
            style={[
              styles.row,
              {
                gap: 6,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("FollowsScreen", {
                  userId: props.user.id,
                  isModal: props.isModal || false,
                })
              }
              style={[
                styles.row,
                {
                  marginVertical: 12,
                  // gap: 12,
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
                {/* {[].map((avatar, index) => {
                  return (
                    <Image
                      source={{
                        uri: avatar,
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
                })} */}
              </View>
              <Typography variant="sm" color="secondary">
                {props.user.followersCount === 1
                  ? "1 follower"
                  : `${formatNumber(props.user.followersCount)} followers`}
              </Typography>
            </TouchableOpacity>
            {false ? (
              <>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: colors.textSecondary,
                    },
                  ]}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    // navigation.navigate("WebViewScreen", {
                    //   url: "https://expo.dev",
                    // });
                    async function openBrowser() {
                      await WebBrowser.openBrowserAsync("https://expo.dev");
                    }
                    openBrowser();
                  }}
                >
                  <Typography variant="sm" color="secondary">
                    {formatNumber(props.user.followersCount || 0)} followers
                  </Typography>
                </TouchableOpacity>
              </>
            ) : (
              <></>
            )}
          </View>
          <View
            style={[
              styles.row,
              {
                gap: 8,
                height: 36,
                marginTop: 8,
              },
            ]}
          >
            {isCurrentUser ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.button,
                    {
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => navigation.navigate("EditProfileScreen")}
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
                    const url = `${process.env.EXPO_PUBLIC_CLIENT_URL}/@${props.user.username}`;
                    Share.share({
                      url,
                    });
                  }}
                >
                  <Typography variant="sm" fontWeight={600}>
                    Share profile
                  </Typography>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.button,
                    {
                      borderColor: isFollowing ? colors.border : colors.text,
                      backgroundColor: isFollowing
                        ? "transparent"
                        : colors.text,
                    },
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setIsFollowing((prevValue) => !prevValue);
                  }}
                >
                  <Typography
                    variant="sm"
                    fontWeight={600}
                    color={isFollowing ? colors.text : colors.background}
                  >
                    {isFollowing ? "Following" : "Follow"}
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
                  onPress={() => {}}
                >
                  <Typography variant="sm" fontWeight={600}>
                    Mention
                  </Typography>
                </TouchableOpacity>
              </>
            )}
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
              scrollXRef.current?.scrollTo({ animated: true, x: width });
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
                repostsTabTextAnimatedStyle,
              ]}
            >
              Reposts
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
          nestedScrollEnabled
        >
          <View style={{ width }}>
            {true ? (
              <View
                style={{
                  paddingTop: height * 0.2,
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <Typography
                  variant="body"
                  color={colors.textSecondary}
                  textAlign="center"
                >
                  {isCurrentUser
                    ? "You haven't posted any threads yet."
                    : "No threads yet"}
                </Typography>
              </View>
            ) : (
              <>
                {/* {threads.map((thread) => (
                  <ThreadView
                    variant="list-thread"
                    thread={thread}
                    key={thread.id}
                  />
                ))} */}
              </>
            )}
          </View>
          <View style={{ width }}></View>
          <View style={{ width }}></View>
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
    borderRadius: 12,
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
    width: "33.333%",
    height: 1.64,
  },
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3 / 2,
  },
});
