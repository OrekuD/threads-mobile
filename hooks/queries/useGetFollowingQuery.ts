import { useQuery } from "@tanstack/react-query";
import User from "@/models/User";
import ErrorResponse from "@/network/responses/ErrorResponse";
import getAccessToken from "@/utils/getAccessToken";
import useAccessTokenStore from "@/store/accessTokenStore";

async function getFollowing(userId: number) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user/${userId}/following`;
  const accessToken = getAccessToken();

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
