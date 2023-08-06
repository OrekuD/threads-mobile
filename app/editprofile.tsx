import { PlusIcon, ProfileActiveIcon } from "@/components/Icons";
import Switch from "@/components/Switch";
import TextInput from "@/components/TextInput";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  ActionSheetIOS,
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "@/components/Header";
import { isAndroid } from "@/constants/Platform";

export default function EditProfile() {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

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
      return "#181818";
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
      <Header backgroundColor={colors.modalBackground} title="Edit profile" />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.text} />
        ) : (
          <View
            style={[
              styles.content,
              {
                borderColor: borderColor,
                backgroundColor,
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
                  value="@oreku__"
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
                router.push("/editbio");
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
                router.push("/editlink");
              }}
            >
              <TextInput
                label="Link"
                placeholder="+ Add link"
                borderColor={borderColor}
                editable={false}
              />
            </TouchableOpacity>
            <View
              style={[
                styles.row,
                {
                  justifyContent: "space-between",
                  paddingTop: 14,
                  paddingBottom: 8,
                },
              ]}
            >
              <Typography variant="sm" fontWeight={600}>
                Private profile
              </Typography>
              <Switch />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  content: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 6,
    marginBottom: 28,
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
});
