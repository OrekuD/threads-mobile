import { StaticRoutes } from "expo-router";
import { HomeIcon } from "./components/Icons";

export interface BottomNavigationTab {
  inActiveIcon: typeof HomeIcon;
  activeIcon: typeof HomeIcon;
  href: StaticRoutes;
  index: number;
}

export interface CameraContextType {
  hasCameraPermission: boolean;
  setHasCameraPermission: (hasCameraPermission: boolean) => void;
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
