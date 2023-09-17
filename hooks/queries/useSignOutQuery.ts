import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import User from "@/models/User";
import ErrorResponse from "@/network/responses/ErrorResponse";
import useUserStore from "@/store/userStore";
import getAccessToken from "@/utils/getAccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

async function signOut() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/sign-out`;
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  await AsyncStorage.removeItem(AsyncStorageKeys.AUTHENTICATION);
  window.location.href = "/login";
  useUserStore.setState({ user: null });

  if (response.status === 200) {
    return response.json();
  }

  const error =
    ((await response.json()) as ErrorResponse)?.errors?.[0] ||
    "Something went wrong.";

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
