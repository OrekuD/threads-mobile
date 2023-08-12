import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import useColors from "@/hooks/useColors";

export default function TabLayout() {
  const colors = useColors();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
      tabBar={(props) => <TabBar {...props} />}
      sceneContainerStyle={{
        backgroundColor: colors.background,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
