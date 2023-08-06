import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CancelIcon, CheckIcon } from "./Icons";
import useColors from "@/hooks/useColors";

interface Props {
  title: string;
  backgroundColor?: string;
  centerTitle?: boolean;
  hasCheckIcon?: boolean;
  hideRightButton?: boolean;
  hasBorder?: boolean;
  onCancelButtonPressed?: () => void;
}

const isAndroid = Platform.OS === "android";

export default function Header(props: Props) {
  const router = useRouter();
  const colors = useColors();
  const { top } = useSafeAreaInsets();

  if (isAndroid) {
    return (
      <View
        style={[
          styles.androidHeader,
          {
            paddingTop: top + 14,
            paddingBottom: 16,
            borderColor: colors.cardBorder,
            borderBottomWidth: props.hasBorder ? 1 : 0,
            // backgroundColor: "red",
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onCancelButtonPressed || router.back}
        >
          <CancelIcon size={24} color={colors.text} />
        </TouchableOpacity>
        <Typography
          variant="body2"
          fontWeight={600}
          style={{
            flex: 1,
            textAlign: props.centerTitle ? "center" : undefined,
          }}
        >
          {props.title}
        </Typography>
        {props.hideRightButton ? (
          <></>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={router.back}>
            {props.hasCheckIcon ? (
              <CheckIcon size={24} color={colors.text} />
            ) : (
              <Typography variant="body2" fontWeight={600}>
                Done
              </Typography>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.iosHeader,
        {
          backgroundColor: props.backgroundColor || "transparent",
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.iosButton,
          {
            left: 16,
          },
        ]}
        onPress={props.onCancelButtonPressed || router.back}
      >
        <Typography variant="body">Cancel</Typography>
      </TouchableOpacity>
      <Typography variant="body2" fontWeight={600}>
        {props.title}
      </Typography>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.iosButton,
          {
            right: 16,
          },
        ]}
        onPress={router.back}
      >
        <Typography variant="body" fontWeight={600} color="#16A1FB">
          Done
        </Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iosHeader: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iosButton: {
    position: "absolute",
    bottom: 15,
  },
  androidHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 22,
  },
});
