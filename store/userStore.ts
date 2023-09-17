import { create } from "zustand";
import User from "../models/User";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
