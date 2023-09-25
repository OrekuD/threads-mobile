import Thread from "@/models/Thread";
import ErrorResponse from "@/network/responses/ErrorResponse";
import getAccessToken from "@/utils/getAccessToken";
import { useQuery } from "@tanstack/react-query";

async function getUserReplies(username: string) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user/${username}/replies`;

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

  return Promise.reject(error);
}

export default function useGetUserRepliesQuery(username: string) {
  const query = useQuery<Array<Thread>>({
    queryKey: ["user", username, "replies"],
    queryFn: () => getUserReplies(username),
  });

  return query;
}
