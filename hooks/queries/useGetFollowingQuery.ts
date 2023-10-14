import { useQuery } from "@tanstack/react-query";
import User from "@/models/User";
import axiosInstance from "@/network/api";

async function getFollowing(userId: number) {
  const url = `/user/${userId}/following`;

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

export default function useGetFollowingQuery(userId: number) {
  const query = useQuery<Array<User>>({
    queryKey: ["following", userId],
    queryFn: () => getFollowing(userId),
  });

  return query;
}
