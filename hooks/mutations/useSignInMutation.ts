import axiosInstance from "@/network/api";
import useAccessTokenStore from "@/store/accessTokenStore";
import useToastsStore from "@/store/toastsStore";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SignInRequest {
  username: string;
  password: string;
}

async function signIn(payload: SignInRequest) {
  const url = `/auth/sign-in`;

  const response = await axiosInstance.post(url, payload);

  if (response.status === 200) {
    return response.data;
  }
  const error = response.data?.errors?.[0] || "Something went wrong.";

  return Promise.reject(error);
}

export default function useSignInMutation() {
  const userStore = useUserStore();
  const toastsStore = useToastsStore();
  const accessTokenStore = useAccessTokenStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      userStore.setUser(data.user);
      accessTokenStore.setAccessToken(data.accessToken);
      // console.log("useSignInMutation: ", data.accessToken);
      // queryClient.invalidateQueries({ queryKey: ["user", "index"] });
    },
    onError: () => {
      toastsStore.addToast("Incorrect password");
    },
  });

  return mutation;
}
