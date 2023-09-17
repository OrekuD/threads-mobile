import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TimelineStore {
  isForYou: boolean;
  toggleForYou: () => void;
}

const useTimelineStore = create<TimelineStore>()(
  persist(
    (set) => ({
      isForYou: true,
      toggleForYou: () => set((state) => ({ isForYou: !state.isForYou })),
    }),
    {
      name: AsyncStorageKeys.TIMELINE,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isForYou: state.isForYou }),
    }
  )
);

export default useTimelineStore;
