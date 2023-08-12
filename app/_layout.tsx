import useColors from "@/hooks/useColors";
import { PortalProvider } from "@gorhom/portal";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, TextInput } from "react-native";
import { isAndroid } from "@/constants/Platform";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import AuthContextProvider, { useAuthContext } from "@/context/AuthContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterLight: require("../assets/fonts/Inter-Light.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
  });
  const colors = useColors();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
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
    <AuthContextProvider>
      <RootLayoutNav />
    </AuthContextProvider>
  );
}

function RootLayoutNav() {
  const auth = useAuthContext();
  const isDarkMode = useIsDarkMode();
  const colors = useColors();

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <StatusBar animated backgroundColor={colors.background} translucent />
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <PortalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
            // initialRouteName={auth.isAuthenticated ? "(tabs)" : "index"}
          >
            <Stack.Screen name="index" />
            <Stack.Screen
              name="thread/[id]"
              getId={({ params }) => String(Date.now())}
            />
            <Stack.Screen
              name="create"
              options={{
                presentation: isAndroid ? undefined : "modal",
                animation: isAndroid ? "fade_from_bottom" : undefined,
              }}
            />
            <Stack.Screen
              name="follows"
              options={{
                presentation: isAndroid ? undefined : "modal",
                animation: isAndroid ? "fade_from_bottom" : undefined,
              }}
            />
            <Stack.Screen
              name="editprofile"
              options={{
                presentation: isAndroid ? undefined : "modal",
                animation: isAndroid ? "fade_from_bottom" : undefined,
              }}
            />
            <Stack.Screen
              name="editbio"
              options={{
                presentation: isAndroid ? undefined : "modal",
                animation: isAndroid ? "fade_from_bottom" : undefined,
              }}
            />
            <Stack.Screen
              name="editlink"
              options={{
                presentation: isAndroid ? undefined : "modal",
                animation: isAndroid ? "fade_from_bottom" : undefined,
              }}
            />
          </Stack>
        </PortalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
