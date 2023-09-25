import ErrorResponse from "@/network/responses/ErrorResponse";
import useAccessTokenStore from "@/store/accessTokenStore";
import useUserStore from "@/store/userStore";
import getAccessToken from "@/utils/getAccessToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RepostThreadRequest {
  threadId: string;
}

async function repostThread(payload: RepostThreadRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/threads/${payload.threadId}/reposts`;
  const accessToken = getAccessToken();

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
    // useAccessTokenStore.getState().setAccessToken(null);
  }

  return Promise.reject(error);
}

export default function useRepostThreadMutation() {
  const queryClient = useQueryClient();
  const userStore = useUserStore((state) => state);

  const mutation = useMutation({
    mutationFn: repostThread,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "timeline"],
      });
      if (userStore.user?.username) {
        queryClient.invalidateQueries({
          queryKey: ["user", userStore.user.username, "reposts"],
        });
      }
    },
  });

  return mutation;
}
