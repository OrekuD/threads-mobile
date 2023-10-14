import Thread from "@/models/Thread";
import axiosInstance from "@/network/api";
import { useQuery } from "@tanstack/react-query";

async function getThread(threadId: string) {
  const url = `/threads/${threadId}`;

  const response = await axiosInstance.get(url);

  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useGetThreadQuery(threadId: string) {
  const query = useQuery<Thread>({
    queryKey: ["threads", threadId],
    queryFn: () => getThread(threadId),
  });

  return query;
}
