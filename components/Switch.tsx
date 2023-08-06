import useIsDarkMode from "@/hooks/useIsDarkMode";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface Props {
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const darkModeInActiveContainerBackgroundColor = "#333335";
const darkModeActiveContainerBackgroundColor = "#F2F5F6";

const lightModeInActiveContainerBackgroundColor = "#E9E9E9";
const lightModeActiveContainerBackgroundColor = "#000000";

export default function Switch(props: Props) {
  const isDarkMode = useIsDarkMode();
  const [isChecked, setIsChecked] = React.useState(false);
  const animation = useSharedValue(0);

  React.useEffect(() => {
    animation.value = withTiming(isChecked ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isChecked]);

  React.useEffect(() => {
    setIsChecked(props.isChecked || false);
  }, [props.isChecked]);

  const inActiveContainerBackgroundColor = React.useMemo(
    () =>
      isDarkMode
        ? darkModeInActiveContainerBackgroundColor
        : lightModeInActiveContainerBackgroundColor,
    [isDarkMode]
  );

  const activeContainerBackgroundColor = React.useMemo(
    () =>
      isDarkMode
        ? darkModeActiveContainerBackgroundColor
        : lightModeActiveContainerBackgroundColor,
    [isDarkMode]
  );

  const knobAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(animation.value, [0, 1], [0, 20]),
        },
      ],
    };
  }, []);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [0, 1],
        [inActiveContainerBackgroundColor, activeContainerBackgroundColor]
      ),
    };
  }, [inActiveContainerBackgroundColor, activeContainerBackgroundColor]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsChecked((prevValue) => {
          props.onChange?.(!prevValue);
          return !prevValue;
        });
      }}
    >
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <Animated.View
          style={[
            styles.knob,
            {
              backgroundColor: isDarkMode ? "#181818" : "#FFFEFE",
            },
            knobAnimatedStyle,
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 3,
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
