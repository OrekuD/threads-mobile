import User from "@/models/User";
import axiosInstance from "@/network/api";
import useUserStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

async function signOut() {
  const url = `/auth/sign-out`;

  const response = await axiosInstance.get(url);

  // useAccessTokenStore.getState().setAccessToken(null);
  useUserStore.setState({ user: null });

  if (response.status === 200) {
    return response.data;
  }

  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useSignOutQuery() {
  const query = useQuery<User>({
    queryKey: ["auth", "sign-out"],
    queryFn: signOut,
    enabled: false,
  });

  return {
    ...query,
    // isLoading: query.isLoading && query.fetchStatus === "fetching",
    isLoading: query.isLoading && query.fetchStatus !== "idle",
  };
}
