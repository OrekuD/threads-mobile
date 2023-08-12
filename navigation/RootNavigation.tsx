import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React from "react";
import LandingScreen from "../screens/landing";
import EditBioScreen from "../screens/editbio";
import EditLinkScreen from "../screens/editlink";
import { isAndroid } from "../constants/Platform";
import EditProfileScreen from "../screens/editprofile";
import FollowsScreen from "../screens/follows";
import CreateThreadScreen from "../screens/createthread";
import BottomTabNavigation from "./BottomTabNavigation";
import SetupProfileScreen from "@/screens/setupprofile";
import { useAuthContext } from "@/context/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

const modalNavigationOptions: NativeStackNavigationOptions = {
  presentation: isAndroid ? undefined : "modal",
  animation: isAndroid ? "fade_from_bottom" : undefined,
};

export default function RootNavigation() {
  const authContext = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={
          authContext.isAuthenticated ? "MainScreen" : "LandingScreen"
        }
      >
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="MainScreen" component={BottomTabNavigation} />
        <Stack.Screen
          name="SetupProfileScreen"
          component={SetupProfileScreen}
        />
        <Stack.Screen
          name="EditBioScreen"
          component={EditBioScreen}
          options={modalNavigationOptions}
        />
        <Stack.Screen
          name="EditLinkScreen"
          component={EditLinkScreen}
          options={modalNavigationOptions}
        />
        <Stack.Screen
          name="CreateThreadScreen"
          component={CreateThreadScreen}
          options={modalNavigationOptions}
        />
        <Stack.Screen
          name="FollowsScreen"
          component={FollowsScreen}
          options={modalNavigationOptions}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={modalNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
