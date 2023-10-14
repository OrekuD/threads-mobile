import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import axiosInstance from "@/network/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AccessTokenStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

const useAccessTokenStore = create<AccessTokenStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: AsyncStorageKeys.ACCESS_TOKEN,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        if (state.accessToken) {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${state.accessToken}`;
        }
        return { accessToken: state.accessToken };
      },
    }
  )
);

export default useAccessTokenStore;
