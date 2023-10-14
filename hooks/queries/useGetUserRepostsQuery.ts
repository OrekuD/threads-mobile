import Thread from "@/models/Thread";
import axiosInstance from "@/network/api";
import { useQuery } from "@tanstack/react-query";

async function getUserReposts(username: string) {
  const url = `/user/${username}/reposts`;

  const response = await axiosInstance.get(url);

  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useGetUserRepostsQuery(username: string) {
  const query = useQuery<Array<Thread>>({
    queryKey: ["user", username, "reposts"],
    queryFn: () => getUserReposts(username),
  });

  return query;
}
