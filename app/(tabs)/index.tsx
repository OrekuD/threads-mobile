import { Logo } from "@/components/Icons";
import Thread from "@/components/Thread";
import useColors from "@/hooks/useColors";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { Link } from "expo-router";

export default function HomeScreen() {
  const colors = useColors();
  const [isLoading, setIsLoading] = React.useState(true);
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
        data={Array(3).fill("d")}
        scrollEventThrottle={16}
        onScroll={onScroll}
        keyExtractor={() => Math.random().toString()}
        renderItem={({ item }) => {
          return (
            <Link
              href={{
                pathname: "/thread/[id]",
                params: { id: Math.random().toString() },
              }}
            >
              <Thread variant="list-thread" />
            </Link>
          );
        }}
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
