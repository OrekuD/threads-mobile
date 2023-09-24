import { create } from "zustand";

interface ToastsStore {
  list: Array<string>;
  addToast: (message: string) => void;
  removeOldest: () => void;
}

const useToastsStore = create<ToastsStore>((set) => ({
  list: [],
  addToast: (message) => {
    set((state) => ({ list: [...state.list, message] }));
    setTimeout(() => {
      set((state) => ({ list: state.list.slice(1) }));
    }, 1500);
  },
  removeOldest: () => set((state) => ({ list: state.list.slice(1) })),
}));

export default useToastsStore;
