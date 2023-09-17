import User from "@/models/User";
import ErrorResponse from "@/network/responses/ErrorResponse";
import getAccessToken from "@/utils/getAccessToken";
import { useQuery } from "@tanstack/react-query";

async function getSuggestedAccounts() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/follow/suggested-accounts`;
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

export default function useGetSuggestedAccountsQuery() {
  const query = useQuery<Array<User>>({
    queryKey: ["suggested-accounts"],
    queryFn: getSuggestedAccounts,
  });

  return query;
}
