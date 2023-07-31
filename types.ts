import { StaticRoutes } from "expo-router";
import { HomeIcon } from "./components/Icons";

export interface Tab {
  inActiveIcon: typeof HomeIcon;
  activeIcon: typeof HomeIcon;
  href: StaticRoutes;
  index: number;
}
