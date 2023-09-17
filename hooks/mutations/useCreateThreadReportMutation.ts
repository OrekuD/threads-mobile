import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import ThreadReport from "@/namespaces/ThreadReport";
import ErrorResponse from "@/network/responses/ErrorResponse";
import useToastsStore from "@/store/toastsStore";
import getAccessToken from "@/utils/getAccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

interface CreateThreadReportRequest {
  descriptionId: ThreadReport.State;
  threadId: string;
}

async function createThreadReport({
  threadId,
  descriptionId,
}: CreateThreadReportRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/threads/${threadId}/reports`;
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ descriptionId }),
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

export default function useCreateThreadReportMutation() {
  const toastsStore = useToastsStore();
  const mutation = useMutation({
    mutationFn: createThreadReport,
    onSuccess: () => {
      toastsStore.addToast("Thread report submitted.");
    },
    onError: () => {
      toastsStore.addToast("Something went wrong. Please try again later.");
    },
  });

  return mutation;
}