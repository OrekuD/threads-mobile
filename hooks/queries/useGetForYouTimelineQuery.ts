import Thread from "@/models/Thread";
import axiosInstance from "@/network/api";
import { useQuery } from "@tanstack/react-query";

async function getForYouTimeline() {
  const url = `/user/timeline/for-you`;

  const response = await axiosInstance.get(url);

  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  if (error === "invalid_token") {
    // useAccessTokenStore.getState().setAccessToken(null);
  }

  return Promise.reject(error);
}

export default function useGetForYouTimelineQuery() {
  const query = useQuery<Array<Thread>>({
    queryKey: ["user", "timeline", "for-you"],
    queryFn: getForYouTimeline,
  });

  return query;
}
