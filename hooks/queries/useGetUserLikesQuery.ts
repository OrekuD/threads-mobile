import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import Thread from "@/models/Thread";
import ErrorResponse from "@/network/responses/ErrorResponse";
import getAccessToken from "@/utils/getAccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

async function getUserLikes() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user/likes`;
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
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

export default function useGetUserLikesQuery() {
  const query = useQuery<Array<Thread>>({
    queryKey: ["user", "likes"],
    queryFn: getUserLikes,
  });

  return query;
}
