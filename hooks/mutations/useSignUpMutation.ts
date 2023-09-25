import ErrorResponse from "@/network/responses/ErrorResponse";
import useAccessTokenStore from "@/store/accessTokenStore";
import useToastsStore from "@/store/toastsStore";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SignUpRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

async function signUp(payload: SignUpRequest) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/sign-up`;

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

export default function useSignUpMutation() {
  const userStore = useUserStore();
  const toastsStore = useToastsStore();
  const accessTokenStore = useAccessTokenStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      accessTokenStore.setAccessToken(data.accessToken);
      // navigate("/suggested-accounts"); TODO:
      userStore.setUser(data.user);
    },
    onError: (error: string) => {
      if (error.toLowerCase().includes("invalid email")) {
        toastsStore.addToast("Enter a valid email");
      } else if (error.toLowerCase().includes("username_exists")) {
        toastsStore.addToast("Username already exists");
      } else if (error.toLowerCase().includes("email_exists")) {
        toastsStore.addToast("Email already exists");
      } else {
        toastsStore.addToast("Something went wrong.");
      }
    },
  });

  return mutation;
}
