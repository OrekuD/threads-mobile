import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import { View } from "react-native";

export default function HomeScreen() {
  const colors = useColors();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    ></View>
  );
}
