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
import ThreadImagesScreen from "@/screens/threadimages";
import ThreadScreen from "@/screens/thread";
import { useUserContext } from "@/context/UserContext";
import { ActivityIndicator, View } from "react-native";
import useColors from "@/hooks/useColors";
import UserProfileScreen from "@/screens/userprofile";
import WebViewScreen from "@/screens/webview";

const Stack = createNativeStackNavigator<RootStackParamList>();

const modalNavigationOptions: NativeStackNavigationOptions = {
  presentation: isAndroid ? undefined : "modal",
  animation: isAndroid ? "fade_from_bottom" : undefined,
};

export default function RootNavigation() {
  const userContext = useUserContext();
  const colors = useColors();

  if (userContext.state.isInitializing) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="small" color={colors.text} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={
          userContext.state.isAuthenticated
            ? userContext.state.isProfileSetup
              ? "MainScreen"
              : "SetupProfileScreen"
            : "LandingScreen"
        }
      >
        <>
          {userContext.state.isAuthenticated ? (
            <>
              <Stack.Screen name="MainScreen" component={BottomTabNavigation} />
              <Stack.Screen
                name="SetupProfileScreen"
                component={SetupProfileScreen}
              />
            </>
          ) : (
            <></>
          )}
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            getId={({ params }) => params?.user.id}
          />
          <Stack.Screen
            name="ThreadImagesScreen"
            component={ThreadImagesScreen}
          />
          <Stack.Screen
            name="EditBioScreen"
            component={EditBioScreen}
            options={modalNavigationOptions}
          />
          <Stack.Screen
            name="WebViewScreen"
            component={WebViewScreen}
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
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
