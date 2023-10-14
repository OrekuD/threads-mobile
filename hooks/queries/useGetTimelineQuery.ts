import Thread from "@/models/Thread";
import axiosInstance from "@/network/api";
import getAccessToken from "@/utils/getAccessToken";
import { useQuery } from "@tanstack/react-query";

async function getTimeline() {
  const url = `/user/timeline`;

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

export default function useGetTimelineQuery() {
  const query = useQuery<Array<Thread>>({
    queryKey: ["user", "timeline"],
    queryFn: getTimeline,
  });

  return query;
}
