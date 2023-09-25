import { HomeIcon } from "./components/Icons";
import { Dispatch } from "react";
import Thread from "./models/Thread";

export type RootStackParamList = {
  MainScreen: {
    screen: keyof BottomTabParamList;
  };
  SetupProfileScreen: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
  EditBioScreen: undefined;
  EditLinkScreen: undefined;
  EditNameScreen: undefined;
  EditUsernameScreen: undefined;
  EditEmailScreen: undefined;
  CreateThreadScreen:
    | {
        type: "new";
      }
    | {
        type: "reply" | "quote";
        thread: Thread;
      };
  FollowsScreen: {
    userId: number;
    isModal: boolean;
  };
  EditProfileScreen: undefined;
  SettingsScreen: undefined;
  YourLikesScreen: undefined;
  AboutTheAppScreen: undefined;
  ReportAProblemScreen: undefined;
  ThreadScreen: { thread: Thread };
  ThreadImagesScreen: { images: Array<string>; index: number };
  UserProfileScreen: { username: string };
  UserProfileModalScreen: { username: string };
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
