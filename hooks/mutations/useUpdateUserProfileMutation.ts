import { useMutation } from "@tanstack/react-query";
import useUserStore from "../../store/userStore";
import useToastsStore from "../../store/toastsStore";
import { isAndroid } from "@/constants/Platform";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "@/network/api";

interface UpdateUserProfileRequest {
  username: string;
  name: string;
  email: string;
  bio?: string;
  link?: string;
  isPrivate: boolean;
  profilePicture?: string;
}

async function updateUserProfile(payload: UpdateUserProfileRequest) {
  const url = `/user`;

  const formData = new FormData();

  if (payload.profilePicture) {
    formData.append("file", {
      uri: isAndroid
        ? payload.profilePicture
        : `file://${payload.profilePicture}`,
      type: "image/jpg",
      name: payload.profilePicture.split("/").pop(),
    } as any);
  }

  formData.append("username", payload.username);
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  if (payload.bio) {
    formData.append("bio", payload.bio);
  }
  if (payload.link) {
    formData.append("link", payload.link);
  }
  formData.append("isPrivate", payload.isPrivate ? "true" : "false");

  const response = await axiosInstance.put(url, formData, {
    transformRequest: () => formData,
  });

  if (response.status === 200) {
    return response.data;
  }

  const error = response.data?.errors?.[0] || "Something went wrong.";

  if (error === "invalid_token") {
    // useAccessTokenStore.getState().setAccessToken(null);
  }

  return Promise.reject(error);
}

export default function useUpdateUserProfileMutation() {
  const userStore = useUserStore((state) => state);
  const toastsStore = useToastsStore();
  const navigation = useNavigation();

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      userStore.setUser(data);
      toastsStore.addToast("Profile updated successfully");
      navigation.goBack();
    },
    onError: (error, v) => {
      if (error === "username_already_taken") {
        Alert.alert("Username already taken");
        return;
      }
      if (error === "email_already_taken") {
        Alert.alert("Email already taken");
        return;
      }

      Alert.alert("Something went wrong");
    },
  });

  return mutation;
}
