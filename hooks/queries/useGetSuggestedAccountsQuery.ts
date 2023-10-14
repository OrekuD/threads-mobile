import User from "@/models/User";
import axiosInstance from "@/network/api";
import { useQuery } from "@tanstack/react-query";

async function getSuggestedAccounts() {
  const url = `/follow/suggested-accounts`;

  const response = await axiosInstance.get(url);
  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useGetSuggestedAccountsQuery() {
  const query = useQuery<Array<User>>({
    queryKey: ["suggested-accounts"],
    queryFn: getSuggestedAccounts,
  });

  return query;
}
