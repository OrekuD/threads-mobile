import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Typography from "./Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftIcon, CancelIcon, CheckIcon } from "./Icons";
import useColors from "@/hooks/useColors";
import { isAndroid } from "@/constants/Platform";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  backgroundColor?: string;
  centerTitle?: boolean;
  hasCheckIcon?: boolean;
  hasArrowIcon?: boolean;
  hideRightButton?: boolean;
  hasBorder?: boolean;
  onCancelButtonPressed?: () => void;
  onDoneButtonPressed?: () => void;
  isDoneButtonDisabled?: boolean;
  isDoneButtonLoading?: boolean;
}

export default function Header(props: Props) {
  const navigation = useNavigation();
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
            borderColor: colors.border,
            borderBottomWidth: props.hasBorder ? 1 : 0,
            // backgroundColor: "red",
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onCancelButtonPressed || navigation.goBack}
        >
          {props.hasArrowIcon ? (
            <ArrowLeftIcon size={24} color={colors.text} />
          ) : (
            <CancelIcon size={24} color={colors.text} />
          )}
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onDoneButtonPressed}
            disabled={props.isDoneButtonDisabled}
          >
            {props.isDoneButtonLoading ? (
              <ActivityIndicator size="small" color={colors.text} />
            ) : (
              <>
                {props.hasCheckIcon ? (
                  <CheckIcon size={24} color={colors.text} />
                ) : (
                  <Typography variant="body2" fontWeight={600}>
                    Done
                  </Typography>
                )}
              </>
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
        onPress={props.onCancelButtonPressed || navigation.goBack}
      >
        <Typography variant="body2">Cancel</Typography>
      </TouchableOpacity>
      <Typography variant="body2" fontWeight={600} style={{ marginBottom: 2 }}>
        {props.title}
      </Typography>
      {props.hideRightButton ? (
        <></>
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.iosButton,
            {
              right: 16,
              opacity: props.isDoneButtonDisabled ? 0.5 : 1,
            },
          ]}
          onPress={props.onDoneButtonPressed}
          disabled={props.isDoneButtonDisabled}
        >
          {props.isDoneButtonLoading ? (
            <ActivityIndicator size="small" color="#16A1FB" />
          ) : (
            <Typography variant="body2" fontWeight={600} color="#16A1FB">
              Done
            </Typography>
          )}
        </TouchableOpacity>
      )}
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
