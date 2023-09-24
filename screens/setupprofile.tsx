import { ImportIcon, PlusIcon, ProfileActiveIcon } from "@/components/Icons";
import TextInput from "@/components/TextInput";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import React from "react";
import {
  ActionSheetIOS,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { isAndroid } from "@/constants/Platform";
import SetupHeader from "@/components/SetupHeader";
import useScreensize from "@/hooks/useScreensize";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import useUserStore from "@/store/userStore";

interface Props extends NativeStackScreenProps<RootStackParamList> {}

export default function SetupProfileScreen(props: Props) {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const [isLoading, setIsLoading] = React.useState(true);
  const { height } = useScreensize();
  const user = useUserStore((state) => state.user);

  const borderColor = isDarkMode ? "#343535" : "#D6D6D6";

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const openActionSheet = React.useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Choose from library", "Import from Instagram"],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
          });
        }
      }
    );
  }, []);

  const backgroundColor = React.useMemo(() => {
    if (isAndroid) {
      return isDarkMode ? "#181818" : colors.modalBackground;
    }
    return isDarkMode ? "#121112" : colors.modalBackground;
  }, [isDarkMode, colors.modalBackground]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isAndroid
          ? colors.background
          : isDarkMode
          ? "#000000"
          : "#F9F9F9",
      }}
    >
      <SetupHeader
        onNext={() => {
          props.navigation.navigate("MainScreen", {
            screen: "HomeScreen",
          });
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.text}
            style={{
              marginTop: height * 0.3,
            }}
          />
        ) : (
          <>
            <Typography
              variant="title"
              fontWeight={600}
              textAlign="center"
              style={{
                marginTop: 20,
                marginBottom: 4,
              }}
            >
              Profile
            </Typography>
            <Typography
              variant="sm"
              color="secondary"
              fontWeight={500}
              textAlign="center"
            >
              Customize your Threads profile
            </Typography>
            <View
              style={[
                styles.content,
                {
                  borderColor: borderColor,
                  backgroundColor,
                  marginTop: height * 0.1,
                },
              ]}
            >
              <View
                style={[
                  styles.row,
                  {
                    gap: 16,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <TextInput
                    label="Name"
                    placeholder="+ Add username"
                    borderColor={borderColor}
                    editable={false}
                    value={`@${user?.username || ""}`}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={openActionSheet}
                  style={[
                    styles.avatarContainer,
                    {
                      backgroundColor: isDarkMode ? "#252525" : "#F1F1F1",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.plusIcon,
                      {
                        backgroundColor: isDarkMode ? "#252525" : "#F1F1F1",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.plusIconInner,
                        {
                          backgroundColor: colors.text,
                        },
                      ]}
                    >
                      <PlusIcon
                        color={isDarkMode ? "#252525" : "#FFFFFF"}
                        size={12}
                      />
                    </View>
                  </View>
                  <ProfileActiveIcon
                    size={34}
                    color={colors.text}
                    style={{
                      marginLeft: 6,
                      marginBottom: 4,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  props.navigation.navigate("EditBioScreen");
                }}
              >
                <TextInput
                  label="Bio"
                  placeholder="+ Write bio"
                  borderColor={borderColor}
                  editable={false}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  props.navigation.navigate("EditLinkScreen");
                }}
              >
                <TextInput
                  label="Link"
                  placeholder="+ Add link"
                  borderColor={borderColor}
                  editable={false}
                  noBorder
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.button,
                {
                  backgroundColor: colors.text,
                },
              ]}
            >
              <ImportIcon size={18} color={colors.background} />
              <Typography
                variant="body"
                color={colors.background}
                fontWeight={700}
              >
                Import from Instagram
              </Typography>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  content: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    position: "absolute",
    left: 8,
    bottom: 8,
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  plusIconInner: {
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    gap: 4,
  },
});
