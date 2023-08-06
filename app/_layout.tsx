import useColors from "@/hooks/useColors";
import { PortalProvider } from "@gorhom/portal";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
// import {} from ""
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Platform,
  View,
  useColorScheme,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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

  return <RootLayoutNav />;
}

const isAndroid = Platform.OS === "android";

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const colors = useColors();

  return (
    <ThemeProvider
      // value={DarkTheme}
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
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
          >
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
