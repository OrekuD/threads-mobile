import React, { useReducer } from "react";
import {
  UIStateContextAction,
  UIStateContextActionTypes,
  UIStateContextState,
  UIStateContextType,
} from "@/types";

const UIStateContext = React.createContext<UIStateContextType | undefined>(
  undefined
);

const initialState: UIStateContextState = {
  updatedAt: -1,
};

const reducer = (
  state: UIStateContextState,
  action: UIStateContextAction
): UIStateContextState => {
  switch (action.type) {
    case UIStateContextActionTypes.UPDATE_UISTATE:
      return {
        ...state,
        updatedAt: Date.now(),
      };
    default:
      return state;
  }
};

const UIStateContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UIStateContext.Provider value={{ state, dispatch }}>
      {children}
    </UIStateContext.Provider>
  );
};

export const useUIStateContext = (): UIStateContextType => {
  const context = React.useContext(UIStateContext);
  if (context === undefined) {
    throw new Error("UIStateContextProvider not initialized");
  }
  return context;
};

export default UIStateContextProvider;
