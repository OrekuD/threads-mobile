import User from "@/models/User";
import axiosInstance from "@/network/api";
import { useQuery } from "@tanstack/react-query";

async function getCurrentUser() {
  const url = "/user";
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

export default function useCurrentUserQuery() {
  const query = useQuery<User>({
    queryKey: ["user", "index"],
    queryFn: getCurrentUser,
  });

  return query;
}
