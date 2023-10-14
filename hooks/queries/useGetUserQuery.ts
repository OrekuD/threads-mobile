import User from "@/models/User";
import axiosInstance from "@/network/api";
import { useQuery } from "@tanstack/react-query";

async function getUser(username: string) {
  const url = `/user/${username}`;

  const response = await axiosInstance.get(url);

  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useGetUserQuery(username: string) {
  const query = useQuery<User>({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  });

  return query;
}
