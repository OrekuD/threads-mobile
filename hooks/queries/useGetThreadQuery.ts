import Thread from "@/models/Thread";
import ErrorResponse from "@/network/responses/ErrorResponse";
import getAccessToken from "@/utils/getAccessToken";
import { useQuery } from "@tanstack/react-query";

async function getThread(threadId: string) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/threads/${threadId}`;
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

  return Promise.reject(error);
}

export default function useGetThreadQuery(threadId: string) {
  const query = useQuery<Thread>({
    queryKey: ["threads", threadId],
    queryFn: () => getThread(threadId),
  });

  return query;
}
