import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import useColors from "@/hooks/useColors";
import Typography from "@/components/Typography";
import useSignInMutation from "@/hooks/mutations/useSignInMutation";
import { RootStackParamList } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useScreensize from "@/hooks/useScreensize";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "LogInScreen"> {}

export default function LogInScreen(props: Props) {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const signInMutation = useSignInMutation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { bottom } = useSafeAreaInsets();
  const { width } = useScreensize();

  const cannotProceed = React.useMemo(
    () => !username.trim() || !password.trim(),
    [username, password]
  );

  const handleSubmit = React.useCallback(() => {
    if (cannotProceed || signInMutation.isLoading) {
      return;
    }

    signInMutation.mutate({ password, username });
  }, [username, password, signInMutation.isLoading, cannotProceed]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: bottom + 16,
        overflow: "hidden",
      }}
    >
      <Image
        source={
          colorScheme === "dark"
            ? require("../assets/images/illustration-dark.webp")
            : require("../assets/images/illustration-light.webp")
        }
        resizeMode="contain"
        style={[
          styles.illustration,
          {
            width: width * 2,
            height: width * 2 * 0.285,
            transform: [{ translateX: -width * 0.96 }],
          },
        ]}
      />
      <View style={styles.container}>
        <Typography
          variant="body2"
          textAlign="center"
          fontWeight={700}
          style={{ marginBottom: 6 }}
        >
          Log in
        </Typography>
        <View
          style={[
            styles.textInputContainer,
            {
              backgroundColor: colors.textInputBackgroundColor,
            },
          ]}
        >
          <TextInput
            placeholder="Username or email address"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.textInputContainer,
            {
              backgroundColor: colors.textInputBackgroundColor,
            },
          ]}
        >
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={cannotProceed}
          onPress={handleSubmit}
          style={[
            styles.button,
            {
              backgroundColor: colors.text,
              opacity: cannotProceed ? 0.5 : 1,
            },
          ]}
        >
          {signInMutation.isLoading ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            <Typography
              variant="body"
              fontWeight={500}
              color={colors.background}
            >
              Log in
            </Typography>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={{
            marginTop: 6,
          }}
        >
          <Typography variant="body" color="secondary">
            Forgotten password?
          </Typography>
        </TouchableOpacity>
        <View style={styles.row}>
          <Typography variant="body">Don't have an account?</Typography>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate("SignUpScreen")}
          >
            <Typography variant="body" fontWeight={600}>
              Create one
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate("ReportAProblemScreen")}
        style={{
          alignSelf: "center",
        }}
      >
        <Typography variant="sm" color="secondary">
          Report a problem
        </Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 7,
    paddingTop: 20,
  },
  illustration: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
    resizeMode: "contain",
  },
  textInputContainer: {
    width: "100%",
    height: 55,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  textInput: {
    flex: 1,
    height: "90%",
    fontFamily: "Inter",
    fontSize: 14,
  },
  button: {
    width: "100%",
    height: 55,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
});
