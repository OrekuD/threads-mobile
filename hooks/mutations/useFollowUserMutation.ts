import User from "@/models/User";
import axiosInstance from "@/network/api";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FollowUserRequest {
  userId: string;
}

async function followUser(payload: FollowUserRequest) {
  const url = `/follow/toggle`;

  const response = await axiosInstance.post(url, payload);

  if (response.status === 200) {
    return response.data;
  }

  const error = response.data?.errors?.[0] || "Something went wrong.";

  if (error === "invalid_token") {
    // useAccessTokenStore.getState().setAccessToken(null);
  }

  return Promise.reject(error);
}

export default function useFollowUserMutation() {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: (data: User) => {
      // queryClient.invalidateQueries({ queryKey: ["suggested-accounts"] });
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["following", user.id] });
      }
      if (data?.username) {
        queryClient.invalidateQueries({ queryKey: ["user", data.username] });
      }
    },
  });

  return mutation;
}
