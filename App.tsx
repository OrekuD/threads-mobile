import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ActivityIndicator, Text, View, TextInput } from "react-native";
import { RootStackParamList } from "./types";
import React from "react";
import useColors from "./hooks/useColors";
import { useFonts } from "expo-font";
import { isAndroid } from "./constants/Platform";
import { PortalProvider } from "@gorhom/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useIsDarkMode from "./hooks/useIsDarkMode";
import RootNavigation from "./navigation/RootNavigation";
import AuthContextProvider from "./context/AuthContext";

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;

// WebBrowser.openBrowserAsync(props.href as string);

export default function App() {
  const [loaded, error] = useFonts({
    Inter: require("./assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
  });
  const colors = useColors();
  const isDarkMode = useIsDarkMode();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync();
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
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <StatusBar animated backgroundColor={colors.background} translucent />
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <PortalProvider>
          <AuthContextProvider>
            <RootNavigation />
          </AuthContextProvider>
        </PortalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
