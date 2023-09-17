import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import User from "@/models/User";
import ErrorResponse from "@/network/responses/ErrorResponse";
import useUserStore from "@/store/userStore";
import getAccessToken from "@/utils/getAccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FollowUserRequest {
  userId: string;
}

async function followUser(payload: FollowUserRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/follow/toggle`;
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 200) {
    return response.json();
  }

  const error =
    ((await response.json()) as ErrorResponse)?.errors?.[0] ||
    "Something went wrong.";

  if (error === "invalid_token") {
    await AsyncStorage.removeItem(AsyncStorageKeys.AUTHENTICATION);
  }

  return Promise.reject(error);
}

export default function useFollowUserMutation() {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: (data: User) => {
      // queryClient.invalidateQueries({ queryKey: ["suggested-accounts"] });
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["following", user.id] });
      }
      if (data?.username) {
        queryClient.invalidateQueries({ queryKey: ["user", data.username] });
      }
    },
  });

  return mutation;
}
