import { useQuery } from "@tanstack/react-query";
import ErrorResponse from "../../network/responses/ErrorResponse";
import getAccessToken from "../../utils/getAccessToken";
import Notification from "../../models/Notification";
import useAccessTokenStore from "@/store/accessTokenStore";

async function getUserNotifications() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user/notifications`;
  const accessToken = getAccessToken();

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
    // useAccessTokenStore.getState().setAccessToken(null);
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
