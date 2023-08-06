import useColors from "@/hooks/useColors";
import { View } from "react-native";

export default function FollowsScreen() {
  const colors = useColors();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.modalBackground,
      }}
    ></View>
  );
}

// import { Stack } from "expo-router";

// export default function HomeLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="(home)/index" />
//       <Stack.Screen name="thread" />
//     </Stack>
//   );
// }
