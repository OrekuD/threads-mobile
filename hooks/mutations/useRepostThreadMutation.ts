import axiosInstance from "@/network/api";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RepostThreadRequest {
  threadId: string;
}

async function repostThread(payload: RepostThreadRequest) {
  const url = `/threads/${payload.threadId}/reposts`;

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
