import { useQuery } from "@tanstack/react-query";
import ErrorResponse from "../../network/responses/ErrorResponse";
import getAccessToken from "../../utils/getAccessToken";
import Notification from "../../models/Notification";
import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getUserNotifications() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user/notifications`;
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 200 || response.status === 201) {
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

export default function useGetUserNotificationsQuery() {
  const query = useQuery<Array<Notification>>({
    queryKey: ["user", "notifications"],
    queryFn: getUserNotifications,
  });

  return query;
}
