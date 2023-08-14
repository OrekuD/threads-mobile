import React, { useReducer } from "react";
import {
  ThreadsContextAction,
  ThreadsContextActionTypes,
  ThreadsContextState,
  ThreadsContextType,
} from "@/types";
import Store from "@/store/Store";

const ThreadsContext = React.createContext<ThreadsContextType | undefined>(
  undefined
);

const initialState: ThreadsContextState = {
  list: [],
  updatedAt: -1,
};

const reducer = (
  state: ThreadsContextState,
  action: ThreadsContextAction
): ThreadsContextState => {
  switch (action.type) {
    case ThreadsContextActionTypes.ADD_THREADS:
      const newList = [
        ...state.list,
        ...Array(5)
          .fill(null)
          .map(() => Store.createThread()),
      ];
      return {
        list: newList,
        updatedAt: Date.now(),
      };
    default:
      return state;
  }
};

const ThreadsContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: "ADD_THREADS" });
  }, []);

  return (
    <ThreadsContext.Provider value={{ state, dispatch }}>
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreadsContext = (): ThreadsContextType => {
  const context = React.useContext(ThreadsContext);
  if (context === undefined) {
    throw new Error("ThreadsContextProvider not initialized");
  }
  return context;
};

export default ThreadsContextProvider;
