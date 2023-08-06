import { CancelIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import useKeyboard from "@/hooks/useKeyboard";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditLinkScreen() {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const { bottom } = useSafeAreaInsets();
  const { keyboardHeight } = useKeyboard();
  const animation = useSharedValue(0);

  React.useEffect(() => {
    animation.value = withTiming(keyboardHeight === 0 ? 0 : 1, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [keyboardHeight]);

  const importButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        animation.value,
        [0, 1],
        [(bottom || 20) + 6, keyboardHeight]
      ),
    };
  }, [keyboardHeight, bottom]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.modalBackground }}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.button,
            {
              left: 16,
            },
          ]}
          onPress={router.back}
        >
          <Typography variant="body2">Cancel</Typography>
        </TouchableOpacity>
        <Typography
          variant="body2"
          fontWeight={600}
          style={{
            fontSize: 20,
            lineHeight: 20 * 1.5,
          }}
        >
          Edit link
        </Typography>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.button,
            {
              right: 16,
            },
          ]}
          onPress={router.back}
        >
          <Typography variant="body2" fontWeight={600} color="#16A1FB">
            Done
          </Typography>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View
          style={[
            styles.textInputContainer,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.top}>
            <Typography variant="sm" fontWeight={600}>
              Bio
            </Typography>
            {value.trim().length > 0 ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setValue("")}
                style={[
                  styles.clearButton,
                  {
                    backgroundColor: isDarkMode ? "#767676" : "#989898",
                  },
                ]}
              >
                <CancelIcon size={14} color={colors.background} />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <TextInput
            style={[
              styles.textInput,
              {
                color: "#008AF5",
              },
            ]}
            value={value}
            onChangeText={setValue}
            placeholderTextColor={colors.textSecondary}
            placeholder="https://www.example.com/"
            multiline
          />
        </View>
        <Animated.View style={[styles.importButton, importButtonAnimatedStyle]}>
          <TouchableOpacity
            style={{
              paddingVertical: 14,
              paddingHorizontal: 8,
            }}
            activeOpacity={0.8}
          >
            <Typography variant="sm" color={colors.text} fontWeight={500}>
              Import link from Instagram
            </Typography>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  button: {
    position: "absolute",
    top: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    position: "relative",
  },
  textInputContainer: {
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clearButton: {
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 14,
    flex: 1,
    fontFamily: "Inter",
  },
  importButton: {
    position: "absolute",
    left: 16,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
