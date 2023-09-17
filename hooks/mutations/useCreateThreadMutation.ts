import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/userStore";
import getAccessToken from "@/utils/getAccessToken";
import ErrorResponse from "@/network/responses/ErrorResponse";
import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CreateThreadRequest {
  payload: CreateThreadPayloadRequest;
  replyThreadQueryKeyId: string | null;
  quoteThreadQueryKeyId: string | null;
}

interface CreateThreadPayloadRequest {
  text: string;
  replyThreadId: string | null;
  quoteThreadId: string | null;
  media: Array<File>;
}

async function createThread({ payload }: CreateThreadRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/threads`;
  const accessToken = await getAccessToken();

  const formData = new FormData();

  for (const image of payload.media) {
    formData.append("files", image);
  }
  formData.append("text", payload.text);
  formData.append("replyThreadId", payload.quoteThreadId || "");
  formData.append("quoteThreadId", payload.quoteThreadId || "");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
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

export default function useCreateThreadMutation() {
  const queryClient = useQueryClient();
  const userStore = useUserStore((state) => state);

  const mutation = useMutation({
    mutationFn: createThread,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", "timeline", "for-you"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["user", "timeline", "following"],
      // });
      if (variables?.replyThreadQueryKeyId) {
        queryClient.invalidateQueries({
          queryKey: ["threads", variables.replyThreadQueryKeyId],
        });
      }
      if (variables?.quoteThreadQueryKeyId) {
        queryClient.invalidateQueries({
          queryKey: ["threads", variables.quoteThreadQueryKeyId],
        });
      }
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
