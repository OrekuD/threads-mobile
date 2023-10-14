import ThreadReport from "@/namespaces/ThreadReport";
import axiosInstance from "@/network/api";
import useToastsStore from "@/store/toastsStore";
import { useMutation } from "@tanstack/react-query";

interface CreateThreadReportRequest {
  descriptionId: ThreadReport.State;
  threadId: string;
}

async function createThreadReport({
  threadId,
  descriptionId,
}: CreateThreadReportRequest) {
  const url = `/threads/${threadId}/reports`;

  const response = await axiosInstance.post(url, { descriptionId });

  if (response.status === 200) {
    return response.data;
  }

  const error = response.data?.errors?.[0] || "Something went wrong.";

  if (error === "invalid_token") {
    // useAccessTokenStore.getState().setAccessToken(null);
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
