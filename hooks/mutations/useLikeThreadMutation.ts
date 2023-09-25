import ErrorResponse from "@/network/responses/ErrorResponse";
import useAccessTokenStore from "@/store/accessTokenStore";
import getAccessToken from "@/utils/getAccessToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LikeThreadRequest {
  threadId: string;
}

async function likeThread(payload: LikeThreadRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/threads/${payload.threadId}/likes`;
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

export default function useLikeThreadMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: likeThread,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "likes"],
      });
    },
  });

  return mutation;
}
