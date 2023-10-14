import Thread from "@/models/Thread";
import axiosInstance from "@/network/api";
import { useQuery } from "@tanstack/react-query";

async function getUserThreads(username: string) {
  const url = `/user/${username}/threads`;

  const response = await axiosInstance.get(url);

  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useGetUserThreadsQuery(username: string) {
  const query = useQuery<Array<Thread>>({
    queryKey: ["user", username, "threads"],
    queryFn: () => getUserThreads(username),
  });

  return query;
}
