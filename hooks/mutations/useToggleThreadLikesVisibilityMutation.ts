import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import ErrorResponse from "@/network/responses/ErrorResponse";
import useUserStore from "@/store/userStore";
import getAccessToken from "@/utils/getAccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToggleThreadLikesVisibilityRequest {
  threadId: string;
}

async function toggleThreadLikesVisibility(
  payload: ToggleThreadLikesVisibilityRequest
) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/threads/${payload.threadId}/likes-visibility`;
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    method: "POST",
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

export default function useToggleThreadLikesVisibilityMutation() {
  const queryClient = useQueryClient();
  const userStore = useUserStore((state) => state);

  const mutation = useMutation({
    mutationFn: toggleThreadLikesVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "timeline"],
      });
      if (userStore.user?.username) {
        queryClient.invalidateQueries({
          queryKey: ["user", userStore.user.username, "threads"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", userStore.user.username, "replies"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", userStore.user.username, "reposts"],
        });
      }
    },
  });

  return mutation;
}
