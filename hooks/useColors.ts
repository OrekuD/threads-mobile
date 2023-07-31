import React from "react";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

export default function useColors() {
  const colorScheme = useColorScheme();
  const [colors, setColors] = React.useState<typeof Colors.dark>(Colors.dark);

  React.useEffect(() => {
    if (colorScheme === "dark") {
      setColors(Colors.dark);
    } else {
      setColors(Colors.light);
    }
  }, [colorScheme]);

  return colors;
}
