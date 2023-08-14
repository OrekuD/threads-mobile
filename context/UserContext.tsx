import React, { useReducer } from "react";
import {
  AsyncStorageKeys,
  UserContextAction,
  UserContextActionTypes,
  UserContextState,
  UserContextType,
} from "@/types";
import loadAsyncStorageValue from "@/util/loadAsyncStorageValue";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const initialState: UserContextState = {
  isProfileSetup: false,
  isAuthenticated: false,
  user: null,
  updatedAt: -1,
  isInitializing: true,
};

const reducer = (
  state: UserContextState,
  action: UserContextAction
): UserContextState => {
  switch (action.type) {
    case UserContextActionTypes.ADD_USER:
      return { ...state, user: action.payload, updatedAt: Date.now() };
    case UserContextActionTypes.SETUP_PROFILE:
      return { ...state, isProfileSetup: true, updatedAt: Date.now() };
    case UserContextActionTypes.LOAD_STATE:
      return {
        ...action.payload,
        updatedAt: Date.now(),
        isInitializing: false,
      };
    case UserContextActionTypes.SIGN_IN:
      return { ...state, isAuthenticated: true, updatedAt: Date.now() };
    case UserContextActionTypes.SIGN_OUT:
      return { ...state, isAuthenticated: false, updatedAt: Date.now() };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    async function getState() {
      const state = await loadAsyncStorageValue<UserContextState>(
        AsyncStorageKeys.USER
      );
      if (state) {
        dispatch({ type: "LOAD_STATE", payload: state });
      } else {
        dispatch({ type: "LOAD_STATE", payload: initialState });
      }
    }
    getState();
  }, []);

  React.useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (
          appState.current.match(/active/) &&
          nextAppState.match(/inactive|background/)
        ) {
          try {
            await AsyncStorage.setItem(
              AsyncStorageKeys.USER,
              JSON.stringify(state)
            );
          } catch (error) {}
        }
        appState.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [state.updatedAt]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserContextProvider not initialized");
  }
  return context;
};

export default UserContextProvider;
