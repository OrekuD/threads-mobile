import axiosInstance from "@/network/api";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToggleThreadLikesVisibilityRequest {
  threadId: string;
}

async function toggleThreadLikesVisibility(
  payload: ToggleThreadLikesVisibilityRequest
) {
  const url = `/threads/${payload.threadId}/likes-visibility`;

  const response = await axiosInstance.post(url);

  if (response.status === 200) {
    return response.data;
  }

  const error = response.data?.errors?.[0] || "Something went wrong.";

  if (error === "invalid_token") {
    // useAccessTokenStore.getState().setAccessToken(null);
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
