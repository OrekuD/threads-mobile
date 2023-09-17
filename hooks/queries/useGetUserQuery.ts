import User from "@/models/User";
import ErrorResponse from "@/network/responses/ErrorResponse";
import { useQuery } from "@tanstack/react-query";

async function getUser(username: string) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/user/${username}`;

  const response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  }
  const error =
    ((await response.json()) as ErrorResponse)?.errors?.[0] ||
    "Something went wrong.";

  return Promise.reject(error);
}

export default function useGetUserQuery(username: string) {
  const query = useQuery<User>({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  });

  return query;
}
