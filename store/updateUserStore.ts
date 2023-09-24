import { create } from "zustand";

interface UpdateUser {
  link: string;
  email: string;
  name: string;
  username: string;
  bio: string;
}

type UpdateUserKeys = keyof UpdateUser;
// "link" | "email" | "name" | "username" | "bio"

interface UpdateUserStore {
  values: UpdateUser;
  updateValue: (key: UpdateUserKeys, value: string) => void;
  updateValues: (values: UpdateUser) => void;
}

const useUpdateUserStore = create<UpdateUserStore>((set) => ({
  values: {
    link: "",
    email: "",
    name: "",
    username: "",
    bio: "",
  },
  updateValue: (key, value) =>
    set((state) => {
      return { values: { ...state.values, [key]: value } };
    }),
  updateValues: (values) => set(() => ({ values })),
}));

export default useUpdateUserStore;
