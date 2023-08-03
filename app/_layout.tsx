import Typography from "@/components/Typography";
import CameraContextProvider from "@/context/CameraContext";
import useColors from "@/hooks/useColors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

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
    ...FontAwesome.font,
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

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const colors = useColors();
  const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CameraContextProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="create"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </CameraContextProvider>
    </ThemeProvider>
  );
}
