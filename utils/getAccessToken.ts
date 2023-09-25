import useAccessTokenStore from "@/store/accessTokenStore";

export default function getAccessToken() {
  return useAccessTokenStore.getState().accessToken || "";
}
