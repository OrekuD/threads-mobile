import { useColorScheme } from "react-native";

export default function useIsDarkMode() {
  const colorScheme = useColorScheme();

  return colorScheme === "dark";
}
