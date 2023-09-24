import { PlusIcon, ProfileActiveIcon } from "@/components/Icons";
import Switch from "@/components/Switch";
import TextInput from "@/components/TextInput";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import React from "react";
import {
  ActionSheetIOS,
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "@/components/Header";
import { isAndroid } from "@/constants/Platform";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import useUserStore from "@/store/userStore";
import useToastsStore from "@/store/toastsStore";
import useUpdateUserProfileMutation from "@/hooks/mutations/useUpdateUserProfileMutation";
import validateUrl from "@/utils/validateUrl";
import validateEmail from "@/utils/validateEmail";
import useUpdateUserStore from "@/store/updateUserStore";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "EditProfileScreen"> {}

export default function EditProfileScreen(props: Props) {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const user = useUserStore((state) => state.user);
  const [profilePicture, setProfilePicture] = React.useState(
    user?.profile?.profilePicture || ""
  );
  const [uploadedProfilePicture, setUploadedProfilePicture] =
    React.useState("");
  const updateUserStore = useUpdateUserStore();
  const [isPrivateProfile, setIsPrivateProfile] = React.useState(
    user?.profile?.isPrivate || false
  );
  const updateUserProfileMutation = useUpdateUserProfileMutation();
  const toastsStore = useToastsStore();

  React.useEffect(() => {
    updateUserStore.updateValues({
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.profile?.bio || "",
      link: user?.profile?.link || "",
    });
  }, []);

  const borderColor = isDarkMode ? "#343535" : "#D6D6D6";

  const cannotUpdate = React.useMemo(() => {
    return (
      !updateUserStore.values.username.trim() ||
      !updateUserStore.values.email.trim() ||
      !updateUserStore.values.name.trim()
    );
  }, [
    updateUserStore.values.name,
    updateUserStore.values.username,
    updateUserStore.values.email,
  ]);

  const openActionSheet = React.useCallback(() => {
    if (isAndroid) {
      // TODO: Add android action sheet
      return;
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Choose from library"],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
          });

          if (result?.assets && result.assets.length > 0) {
            setUploadedProfilePicture(result.assets[0].uri);
          }
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
      <Header
        backgroundColor={colors.modalBackground}
        title="Edit profile"
        onDoneButtonPressed={() => {
          updateUserProfileMutation.mutate({
            email: updateUserStore.values.email,
            name: updateUserStore.values.name,
            username: updateUserStore.values.username,
            bio: updateUserStore.values.bio.trim(),
            link: updateUserStore.values.link.trim(),
            isPrivate: isPrivateProfile,
            profilePicture: uploadedProfilePicture,
          });
        }}
        isDoneButtonDisabled={
          cannotUpdate || updateUserProfileMutation.isLoading
        }
        isDoneButtonLoading={updateUserProfileMutation.isLoading}
      />
      <View style={styles.container}>
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ flex: 1 }}
              onPress={() => {
                props.navigation.navigate("EditNameScreen");
              }}
            >
              <TextInput
                label="Name"
                placeholder="Your account name"
                borderColor={borderColor}
                editable={false}
                value={updateUserStore.values.name}
              />
            </TouchableOpacity>
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
              {Boolean(profilePicture) || Boolean(uploadedProfilePicture) ? (
                <Image
                  source={{
                    uri: uploadedProfilePicture || profilePicture,
                  }}
                  resizeMode="cover"
                  style={styles.avatar}
                />
              ) : (
                <>
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
                </>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.navigate("EditUsernameScreen");
            }}
          >
            <TextInput
              label="Username"
              placeholder="Your account username"
              value={`@${updateUserStore.values.username}`}
              borderColor={borderColor}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.navigate("EditEmailScreen");
            }}
          >
            <TextInput
              label="Email"
              placeholder="Your account email"
              value={updateUserStore.values.email}
              borderColor={borderColor}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.navigate("EditBioScreen");
            }}
          >
            <TextInput
              label="Bio"
              placeholder="Your bio"
              value={updateUserStore.values.bio}
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
              placeholder="Add a link"
              value={updateUserStore.values.link}
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
            <Switch
              isChecked={isPrivateProfile}
              onChange={setIsPrivateProfile}
            />
          </View>
        </View>
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
    marginBottom: 64,
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
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 52,
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
