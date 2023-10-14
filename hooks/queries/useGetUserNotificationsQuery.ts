import { useQuery } from "@tanstack/react-query";
import ErrorResponse from "../../network/responses/ErrorResponse";
import Notification from "../../models/Notification";
import axiosInstance from "@/network/api";

async function getUserNotifications() {
  const url = `/user/notifications`;

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

export default function useGetUserNotificationsQuery() {
  const query = useQuery<Array<Notification>>({
    queryKey: ["user", "notifications"],
    queryFn: getUserNotifications,
  });

  return query;
}
