import { HomeIcon } from "./components/Icons";
import { Dispatch } from "react";

export type RootStackParamList = {
  LandingScreen: undefined;
  MainScreen: undefined;
  SetupProfileScreen: undefined;
  EditBioScreen: undefined;
  EditLinkScreen: undefined;
  CreateThreadScreen:
    | {
        type: "new";
      }
    | {
        type: "reply" | "quote";
        threadId: string;
      };
  FollowsScreen: {
    followersCount: number;
    followingCount: number;
    username: string;
    isModal?: boolean;
  };
  EditProfileScreen: undefined;
  ThreadScreen: { threadId: string; thread?: Thread }; // used to pass quote threads which are not saved in state
  ThreadImagesScreen: { threadId: string };
  UserProfileScreen: { user: User };
  UserProfileModalScreen: { user: User };
  WebViewScreen: { url: string };
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  ActivityScreen: undefined;
  ProfileScreen: undefined;
};

export interface BottomNavigationTab {
  inActiveIcon: typeof HomeIcon;
  activeIcon: typeof HomeIcon;
  href: keyof BottomTabParamList | "CreateThreadScreen";
  index: number;
}

export interface UserContextState {
  isProfileSetup: boolean;
  isAuthenticated: boolean;
  isInitializing: boolean;
  user: User | null;
  updatedAt: number;
}

export interface UserContextType {
  state: UserContextState;
  dispatch: Dispatch<UserContextAction>;
}

export class UserContextActionTypes {
  public static SETUP_PROFILE = "SETUP_PROFILE" as const;
  public static SIGN_IN = "SIGN_IN" as const;
  public static SIGN_OUT = "SIGN_OUT" as const;
  public static ADD_USER = "ADD_USER" as const;
  public static LOAD_STATE = "LOAD_STATE" as const;
}

export class AsyncStorageKeys {
  public static USER = "user" as const;
}

export type UserContextAction =
  | { type: typeof UserContextActionTypes.SETUP_PROFILE }
  | { type: typeof UserContextActionTypes.SIGN_IN }
  | { type: typeof UserContextActionTypes.SIGN_OUT }
  | { type: typeof UserContextActionTypes.ADD_USER; payload: User }
  | {
      type: typeof UserContextActionTypes.LOAD_STATE;
      payload: UserContextState;
    };

export interface ThreadsContextState {
  list: Array<Thread>;
  userThreads: Array<Thread>;
  updatedAt: number;
}

export interface ThreadsContextType {
  state: ThreadsContextState;
  dispatch: Dispatch<ThreadsContextAction>;
}

export class ThreadsContextActionTypes {
  public static ADD_THREADS = "ADD_THREADS" as const;
  public static ADD_USER_THREADS = "ADD_USER_THREADS" as const;
}

export type ThreadsContextAction =
  | { type: typeof ThreadsContextActionTypes.ADD_THREADS }
  | {
      type: typeof ThreadsContextActionTypes.ADD_USER_THREADS;
      payload: Array<Thread>;
    };

export interface UIStateContextState {
  updatedAt: number;
}

export interface UIStateContextType {
  state: UIStateContextState;
  dispatch: Dispatch<UIStateContextAction>;
}

export class UIStateContextActionTypes {
  public static UPDATE_UISTATE = "UPDATE_UISTATE" as const;
}

export type UIStateContextAction = {
  type: typeof UIStateContextActionTypes.UPDATE_UISTATE;
};

export interface CreateThread {
  text: string;
  media: CreateThreadMedia[];
  replyTo: string;
  threadId: string;
}

export interface CreateThreadMedia {
  url: string;
  aspectRatio: number;
  width: number;
  height: number;
}

export class NotificationTab {
  public static readonly ALL = 0;
  public static readonly FOLLOWS = 1;
  public static readonly REPLIES = 2;
  public static readonly MENTIONS = 3;
  public static readonly QUOTES = 4;
  public static readonly REPOSTS = 5;
  public static readonly VERIFIED = 6;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  link: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
}

export interface Thread {
  id: string;
  text: string;
  media: Array<string>;
  creator: User;
  repliesCount: number;
  likesCount: number;
  parentThread: Thread | null;
}
