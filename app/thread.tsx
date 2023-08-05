import { ChevronLeftIcon } from "@/components/Icons";
import Thread from "@/components/Thread";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ThreadScreen() {
  const colors = useColors();
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
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

  return (
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
            paddingTop: top + 14,
            // borderColor: "red",
          },
          headerAnimatedStyle,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.backButton}
          onPress={router.back}
        >
          <ChevronLeftIcon size={11} color={colors.text} />
          <Typography variant="body">Back</Typography>
        </TouchableOpacity>
        <Typography variant="body2" fontWeight={700}>
          Thread
        </Typography>
      </Animated.View>
      <Animated.FlatList
        ListHeaderComponent={() => <Thread />}
        scrollEventThrottle={16}
        onScroll={onScroll}
        data={[""]}
        renderItem={({ item }) => {
          return <></>;
        }}
      />
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
});
