import axiosInstance from "@/network/api";
import useToastsStore from "@/store/toastsStore";
import { useMutation } from "@tanstack/react-query";

interface ReportAProblemRequest {
  message: string;
}

async function submitReport(payload: ReportAProblemRequest) {
  const url = `/reports`;

  const response = await axiosInstance.post(url, payload);

  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useSubmitReportMutation() {
  const toastsStore = useToastsStore();
  const mutation = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      toastsStore.addToast("Thank you for reporting this problem.");
    },
    onError: () => {
      toastsStore.addToast("Something went wrong. Please try again.");
    },
  });

  return mutation;
}
