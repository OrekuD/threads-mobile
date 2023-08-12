import { isAndroid } from "@/constants/Platform";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftIcon, ChevronLeftIcon } from "./Icons";
import Typography from "./Typography";
import useColors from "@/hooks/useColors";
import { useRouter } from "expo-router";

interface Props {
  //   hasNextButton?: boolean;
  onNext?: () => void;
}

export default function SetupHeader(props: Props) {
  const { top } = useSafeAreaInsets();
  const colors = useColors();
  const router = useRouter();

  if (isAndroid) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: top + 14,
            paddingHorizontal: 12,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            padding: 8,
          }}
          onPress={router.back}
        >
          <ArrowLeftIcon size={24} color={colors.text} />
        </TouchableOpacity>
        {props.onNext ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              padding: 8,
            }}
            onPress={props.onNext}
          >
            <ArrowLeftIcon
              size={24}
              color={colors.text}
              style={{
                transform: [{ rotate: "180deg" }],
              }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + 14,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.row}
        onPress={router.back}
      >
        <ChevronLeftIcon size={10} color={colors.text} />
        <Typography variant="body2" fontWeight={500}>
          Back
        </Typography>
      </TouchableOpacity>
      {props.onNext ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.row}
          onPress={props.onNext}
        >
          <Typography variant="body2" fontWeight={500}>
            Next
          </Typography>
          <ChevronLeftIcon
            size={10}
            color={colors.text}
            style={{
              transform: [{ rotate: "180deg" }],
            }}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
