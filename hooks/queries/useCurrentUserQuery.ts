import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import User from "@/models/User";
import ErrorResponse from "@/network/responses/ErrorResponse";
import getAccessToken from "@/utils/getAccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

async function getCurrentUser() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user`;
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

export default function useCurrentUserQuery() {
  const query = useQuery<User>({
    queryKey: ["user", "index"],
    queryFn: getCurrentUser,
    onError: (error) => {
      console.log(error);
    },
  });

  return query;
}