import Header from "@/components/Header";
import Profile from "@/components/Profile";
import Typography from "@/components/Typography";
import { isAndroid } from "@/constants/Platform";
import useGetFollowersQuery from "@/hooks/queries/useGetFollowersQuery";
import useGetFollowingQuery from "@/hooks/queries/useGetFollowingQuery";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import useScreensize from "@/hooks/useScreensize";
import User from "@/models/User";
import { RootStackParamList } from "@/types";
import formatNumber from "@/utils/formatNumber";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
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
  const followingQuery = useGetFollowingQuery(props.route.params.userId);
  const followersQuery = useGetFollowersQuery(props.route.params.userId);

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
      {isAndroid ? (
        <Header title={"props.route.params.username"} hideRightButton />
      ) : (
        <></>
      )}
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
          {isAndroid ? (
            <></>
          ) : (
            <Animated.Text
              style={[styles.count, { color: colors.text }, followersOpacity]}
            >
              {formatNumber(followersQuery.data?.length || 0)}
            </Animated.Text>
          )}
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
          {isAndroid ? (
            <></>
          ) : (
            <Animated.Text
              style={[styles.count, { color: colors.text }, followingOpacity]}
            >
              {formatNumber(followingQuery.data?.length || 0)}
            </Animated.Text>
          )}
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
        data={[followersQuery, followingQuery]}
        keyExtractor={(_, index) => index.toString()}
        ref={scrollRef as any}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={onScroll}
        nestedScrollEnabled
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width,
                flex: 1,
              }}
            >
              <Tab
                emptyLabel={index === 0 ? "No followers" : "No following"}
                query={item}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

function Tab({
  query,
  emptyLabel,
}: {
  query: UseQueryResult<Array<User>>;
  emptyLabel: string;
}) {
  const colors = useColors();
  const { height } = useScreensize();

  if (query.isLoading)
    return (
      <View
        style={{
          paddingTop: height * 0.3,
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={colors.text} />
      </View>
    );

  if (!query.data || query.data.length === 0) {
    return (
      <View
        style={{
          paddingTop: height * 0.3,
          alignItems: "center",
        }}
      >
        <Typography variant="body" color={colors.textSecondary}>
          {emptyLabel}
        </Typography>
      </View>
    );
  }

  return (
    <FlatList
      data={query.data}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => {
        return <Profile user={item} isModal />;
      }}
    />
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
