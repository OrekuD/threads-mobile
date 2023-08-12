import Header from "@/components/Header";
import { CancelIcon, ImportIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import { isAndroid } from "@/constants/Platform";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import useKeyboard from "@/hooks/useKeyboard";
import { RootStackParamList } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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

interface Props
  extends NativeStackScreenProps<RootStackParamList, "EditLinkScreen"> {}

export default function EditLinkScreen() {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
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
        [(bottom || 20) + 6, isAndroid ? 0 : keyboardHeight]
      ),
    };
  }, [keyboardHeight, bottom]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isAndroid ? colors.background : colors.modalBackground,
      }}
    >
      <Header title="Edit link" centerTitle hasCheckIcon />
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
                verticalAlign: "top",
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
          <TouchableOpacity style={styles.row} activeOpacity={0.8}>
            <ImportIcon size={18} color={colors.text} />
            <Typography variant="body" color={colors.text} fontWeight={500}>
              Import bio from Instagram
            </Typography>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
    zIndex: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
});
