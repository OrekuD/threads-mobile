import ErrorResponse from "@/network/responses/ErrorResponse";
import useAccessTokenStore from "@/store/accessTokenStore";
import useToastsStore from "@/store/toastsStore";
import useUserStore from "@/store/userStore";
import getAccessToken from "@/utils/getAccessToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteThreadRequest {
  threadId: string;
}

async function deleteThread(payload: DeleteThreadRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/threads/${payload.threadId}`;
  const accessToken = getAccessToken();

  const response = await fetch(url, {
    method: "DELETE",
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

export default function useDeleteThreadMutation() {
  const queryClient = useQueryClient();
  const toastsStore = useToastsStore();
  const userStore = useUserStore((state) => state);

  const mutation = useMutation({
    mutationFn: deleteThread,
    onSuccess: (_, variables) => {
      toastsStore.addToast("Deleted");
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
      // if (pathname.includes(variables.threadId)) {
      //   navigate(-1);
      // } TODO:
    },
  });

  return mutation;
}
