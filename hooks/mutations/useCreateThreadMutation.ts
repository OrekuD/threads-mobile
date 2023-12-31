import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/userStore";
import useToastsStore from "@/store/toastsStore";
import { isAndroid } from "@/constants/Platform";
import axiosInstance from "@/network/api";

interface CreateThreadRequest {
  payload: CreateThreadPayloadRequest;
  replyThreadQueryKeyId: string | null;
  quoteThreadQueryKeyId: string | null;
}

interface CreateThreadPayloadRequest {
  text: string;
  replyThreadId: string | null;
  quoteThreadId: string | null;
  media: Array<string>;
}

async function createThread({ payload }: CreateThreadRequest) {
  const url = `/threads`;

  const formData = new FormData();

  for (const image of payload.media) {
    formData.append("files", {
      uri: isAndroid ? image : `file://${image}`,
      type: "image/jpg",
      name: image.split("/").pop(),
    } as any);
  }

  formData.append("text", payload.text);
  formData.append("replyThreadId", payload.replyThreadId || "");
  formData.append("quoteThreadId", payload.quoteThreadId || "");

  const response = await axiosInstance.post(url, formData, {
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

export default function useCreateThreadMutation() {
  const queryClient = useQueryClient();
  const userStore = useUserStore((state) => state);
  const toastsStore = useToastsStore();

  const mutation = useMutation({
    mutationFn: createThread,
    onSuccess: (_, variables) => {
      // console.log("onSuccess", variables);
      queryClient.invalidateQueries({
        queryKey: ["user", "timeline", "for-you"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "timeline", "following"],
      });
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
    onError: (error) => {
      // console.log(error);
      toastsStore.addToast("Something went wrong");
    },
  });

  return mutation;
}
