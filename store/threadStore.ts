import { create } from "zustand";
import Thread from "../models/Thread";

interface ThreadStore {
  thread: Thread | null;
  setThread: (thread: Thread) => void;
}

const useThreadStore = create<ThreadStore>((set) => ({
  thread: null,
  setThread: (thread) => set({ thread }),
}));

export default useThreadStore;
