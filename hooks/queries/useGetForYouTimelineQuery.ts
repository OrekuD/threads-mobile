import Thread from "@/models/Thread";
import ErrorResponse from "@/network/responses/ErrorResponse";
import useAccessTokenStore from "@/store/accessTokenStore";
import getAccessToken from "@/utils/getAccessToken";
import { useQuery } from "@tanstack/react-query";

async function getForYouTimeline() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user/timeline/for-you`;
  const accessToken = getAccessToken();

  const response = await fetch(url, {
    method: "GET",
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

export default function useGetForYouTimelineQuery() {
  const query = useQuery<Array<Thread>>({
    queryKey: ["user", "timeline", "for-you"],
    queryFn: getForYouTimeline,
  });

  return query;
}
