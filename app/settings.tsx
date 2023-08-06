import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const HEADER_HEIGHT = 100;
const INITIAL_OFFSET = 200;

const SettingsScreen = () => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const translateY = scrollY.value >= INITIAL_OFFSET ? -INITIAL_OFFSET : 0;

    return {
      transform: [{ translateY: translateY }],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      paddingTop: HEADER_HEIGHT - scrollY.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
      >
        <Animated.View style={[styles.header, animatedHeaderStyle]}>
          <Text style={styles.headerText}>Sticky Header</Text>
        </Animated.View>
        <View style={styles.content}>
          {Array(50)
            .fill(null)
            .map((_, index) => (
              <Text key={index}>Item {index + 1}</Text>
            ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: INITIAL_OFFSET,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
});

export default SettingsScreen;
