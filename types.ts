import { StaticRoutes } from "expo-router";
import { HomeIcon } from "./components/Icons";
import { Dispatch, SetStateAction } from "react";

export interface BottomNavigationTab {
  inActiveIcon: typeof HomeIcon;
  activeIcon: typeof HomeIcon;
  href: StaticRoutes;
  index: number;
}

export interface ToastContextType {
  showToast: () => void;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

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
