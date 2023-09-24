import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React from "react";
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
import { ActivityIndicator, View } from "react-native";
import useColors from "@/hooks/useColors";
import UserProfileScreen from "@/screens/userprofile";
import UserProfileModalScreen from "@/screens/userprofilemodal";
import useUserStore from "@/store/userStore";
import useCurrentUserQuery from "@/hooks/queries/useCurrentUserQuery";
import LogInScreen from "@/screens/login";
import SignUpScreen from "@/screens/signup";
import ReportAProblemScreen from "@/screens/reportaproblem";
import useGetFollowersQuery from "@/hooks/queries/useGetFollowersQuery";
import useGetFollowingQuery from "@/hooks/queries/useGetFollowingQuery";
import useUserFollowsStore from "@/store/userFollowsStore";
import Toasts from "@/components/Toasts";
import EditUsernameScreen from "@/screens/editusername";
import EditEmailScreen from "@/screens/editemail";
import EditNameScreen from "@/screens/editname";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingsScreen from "@/screens/settings";
import AboutTheAppScreen from "@/screens/abouttheapp";
import YourLikesScreen from "@/screens/yourlikes";

const Stack = createNativeStackNavigator<RootStackParamList>();

const modalNavigationOptions: NativeStackNavigationOptions = {
  presentation: isAndroid ? undefined : "modal",
  animation: isAndroid ? "fade_from_bottom" : undefined,
};

export default function RootNavigation() {
  const userStore = useUserStore();
  const colors = useColors();
  const userFollowsStore = useUserFollowsStore();
  const currentUserQuery = useCurrentUserQuery();
  const followersQuery = useGetFollowersQuery(userStore?.user?.id || -1);
  const followingQuery = useGetFollowingQuery(userStore?.user?.id || -1);

  React.useEffect(() => {
    // AsyncStorage.clear();
    // console.log(process.env.EXPO_PUBLIC_API_URL);
    if (currentUserQuery.isSuccess) {
      userStore.setUser(currentUserQuery.data);
      followersQuery.refetch();
      followingQuery.refetch();
    }
  }, [currentUserQuery.isSuccess, currentUserQuery.data]);

  React.useEffect(() => {
    if (followersQuery.data && followersQuery.isSuccess) {
      userFollowsStore.setFollowers(followersQuery.data);
    }
  }, [followersQuery.data, followersQuery.isSuccess]);

  React.useEffect(() => {
    if (followingQuery.data && followingQuery.isSuccess) {
      userFollowsStore.setFollowing(followingQuery.data);
    }
  }, [followingQuery.data, followingQuery.isSuccess]);

  if (currentUserQuery.isLoading) {
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
    <>
      <Toasts />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={userStore.user ? "MainScreen" : "LogInScreen"}
        >
          <>
            {userStore.user ? (
              <>
                <Stack.Screen
                  name="MainScreen"
                  component={BottomTabNavigation}
                />
                <Stack.Screen
                  name="SetupProfileScreen"
                  component={SetupProfileScreen}
                />
                <Stack.Screen
                  name="ThreadScreen"
                  component={ThreadScreen}
                  getId={({ params }) => params.thread.threadId}
                  listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ params: undefined }),
                  })}
                />
                <Stack.Screen
                  name="UserProfileScreen"
                  component={UserProfileScreen}
                  getId={({ params }) => params.username}
                />
                <Stack.Screen
                  name="ThreadImagesScreen"
                  component={ThreadImagesScreen}
                  listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ params: undefined }),
                  })}
                />
                <Stack.Screen
                  name="UserProfileModalScreen"
                  component={UserProfileModalScreen}
                  options={modalNavigationOptions}
                  getId={({ params }) => params.username}
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
                  name="EditNameScreen"
                  component={EditNameScreen}
                  options={modalNavigationOptions}
                />
                <Stack.Screen
                  name="EditUsernameScreen"
                  component={EditUsernameScreen}
                  options={modalNavigationOptions}
                />
                <Stack.Screen
                  name="EditEmailScreen"
                  component={EditEmailScreen}
                  options={modalNavigationOptions}
                />
                <Stack.Screen
                  name="SettingsScreen"
                  component={SettingsScreen}
                />
                <Stack.Screen
                  name="YourLikesScreen"
                  component={YourLikesScreen}
                  // options={modalNavigationOptions}
                />
                <Stack.Screen
                  name="AboutTheAppScreen"
                  component={AboutTheAppScreen}
                  options={modalNavigationOptions}
                />
                <Stack.Screen
                  name="CreateThreadScreen"
                  component={CreateThreadScreen}
                  options={modalNavigationOptions}
                  listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ params: undefined }),
                  })}
                />
                <Stack.Screen
                  name="FollowsScreen"
                  component={FollowsScreen}
                  options={modalNavigationOptions}
                  getId={({ params }) => params.userId.toString()}
                />
                <Stack.Screen
                  name="EditProfileScreen"
                  component={EditProfileScreen}
                  options={modalNavigationOptions}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="LogInScreen" component={LogInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>
            )}
            <Stack.Screen
              name="ReportAProblemScreen"
              component={ReportAProblemScreen}
              options={modalNavigationOptions}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
