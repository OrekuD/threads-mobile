import { StyleSheet, View } from "react-native";
import Typography from "./Typography";
import useToastsStore from "@/store/toastsStore";
import { Portal } from "@gorhom/portal";
import React from "react";
import useScreensize from "@/hooks/useScreensize";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

export default function Toasts() {
  const toasts = useToastsStore((state) => state.list);

  return (
    <Portal>
      {toasts.map((toast, index) => (
        <Toast toast={toast} key={index} />
      ))}
    </Portal>
  );
}

function Toast(props: { toast: string }) {
  const toastsStore = useToastsStore();
  const { height } = useScreensize();

  React.useEffect(() => {
    setTimeout(() => {
      toastsStore.removeOldest();
    }, 1500);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          top: height / 2 - 24,
        },
      ]}
      pointerEvents="none"
    >
      <Animated.View
        style={styles.toast}
        pointerEvents="none"
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Typography variant="sm" fontWeight={500} color="#fff">
          {props.toast}
        </Typography>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    alignItems: "center",
  },
  toast: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 24, 24, 0.9)",
  },
});
