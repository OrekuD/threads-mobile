import {
  InstagramColorIcon,
  InstagramIcon,
  VerifiedIcon,
} from "@/components/Icons";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import useScreensize from "@/hooks/useScreensize";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const { width } = useScreensize();
  const isDarkMode = useIsDarkMode();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.background : "#F9F9F9",
      }}
    >
      <Image
        source={require("../assets/images/threads.png")}
        style={[
          styles.illustration,
          {
            height: width * 1.639,
          },
        ]}
      />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color={colors.text} />
          <Typography variant="body" color="secondary" fontWeight={500}>
            Get ready for Threads...
          </Typography>
        </View>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              router.push("/profile");

              return;
              setIsLoading(true);
              setTimeout(() => {
                router.push("/profile");
                setIsLoading(false);
              }, 1000);
            }}
            style={[
              styles.button,
              {
                borderColor: colors.border,
                width: width - 32,
                backgroundColor: colors.modalBackground,
                shadowOpacity: isDarkMode ? 0 : 0.3,
              },
            ]}
          >
            <View>
              <Typography variant="body" color="secondary">
                Log in with Instagram
              </Typography>
              <View style={styles.row}>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  style={{
                    lineHeight: undefined,
                  }}
                >
                  randomusername
                </Typography>
                <VerifiedIcon size={14} />
              </View>
            </View>
            <InstagramColorIcon size={32} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.switchAccounts}>
            <Typography variant="body" color="secondary" fontWeight={500}>
              Switch acocunts
            </Typography>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: "100%",
    objectFit: "cover",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 100,
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  switchAccounts: {
    alignSelf: "center",
    marginTop: 20,
  },
  loading: {
    marginTop: 42,
    alignItems: "center",
    gap: 12,
  },
});
