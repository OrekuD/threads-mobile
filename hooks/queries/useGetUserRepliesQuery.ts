import Thread from "@/models/Thread";
import axiosInstance from "@/network/api";
import { useQuery } from "@tanstack/react-query";

async function getUserReplies(username: string) {
  const url = `/user/${username}/replies`;

  const response = await axiosInstance.get(url);

  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useGetUserRepliesQuery(username: string) {
  const query = useQuery<Array<Thread>>({
    queryKey: ["user", username, "replies"],
    queryFn: () => getUserReplies(username),
  });

  return query;
}
