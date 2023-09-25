import ErrorResponse from "@/network/responses/ErrorResponse";
import useAccessTokenStore from "@/store/accessTokenStore";
import useToastsStore from "@/store/toastsStore";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SignInRequest {
  username: string;
  password: string;
}

async function signIn(payload: SignInRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/sign-in`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
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
