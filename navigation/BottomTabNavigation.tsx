import TabBar from "@/components/TabBar";
import ActivityScreen from "@/screens/tabs/activity";
import HomeScreen from "@/screens/tabs/home";
import ProfileScreen from "@/screens/tabs/profile";
import SearchScreen from "@/screens/tabs/search";
import { BottomTabParamList } from "@/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar tabbBarProps={props} />}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="ActivityScreen" component={ActivityScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
