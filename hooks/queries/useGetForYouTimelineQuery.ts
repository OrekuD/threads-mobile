import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import Thread from "@/models/Thread";
import ErrorResponse from "@/network/responses/ErrorResponse";
import getAccessToken from "@/utils/getAccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

async function getForYouTimeline() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user/timeline/for-you`;
  const accessToken = await getAccessToken();

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
    await AsyncStorage.removeItem(AsyncStorageKeys.AUTHENTICATION);
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
