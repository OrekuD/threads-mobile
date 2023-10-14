import axiosInstance from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LikeThreadRequest {
  threadId: string;
}

async function likeThread(payload: LikeThreadRequest) {
  const url = `/threads/${payload.threadId}/likes`;

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
