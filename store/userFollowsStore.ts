import { create } from "zustand";
import User from "../models/User";

interface FollowsStore {
  following: Array<User>;
  followers: Array<User>;
  setFollowing: (users: Array<User>) => void;
  setFollowers: (users: Array<User>) => void;
}

const useUserFollowsStore = create<FollowsStore>((set) => ({
  followers: [],
  following: [],
  setFollowing: (users) => set({ following: users }),
  setFollowers: (users) => set({ followers: users }),
}));

export default useUserFollowsStore;
