import ErrorResponse from "@/network/responses/ErrorResponse";
import useToastsStore from "@/store/toastsStore";
import getAccessToken from "@/utils/getAccessToken";
import { useMutation } from "@tanstack/react-query";

interface ReportAProblemRequest {
  message: string;
}

async function submitReport(payload: ReportAProblemRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/reports`;
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
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
