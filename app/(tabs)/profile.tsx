import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useColors from "@/hooks/useColors";
import {
  GlobeIcon,
  HamburgerIcon,
  InstagramIcon,
  Logo,
} from "@/components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Typography from "@/components/Typography";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import BottomSheet from "@/components/BottomSheet";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const colors = useColors();
  const { top } = useSafeAreaInsets();
  const isDarkMode = useIsDarkMode();
  const router = useRouter();
  const [isThreadsBottomSheetOpen, setIsThreadsBottomSheetOpen] =
    React.useState(false);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <BottomSheet
          height={250}
          isOpen={isThreadsBottomSheetOpen}
          onClose={() => setIsThreadsBottomSheetOpen(false)}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={[
                styles.row,
                {
                  justifyContent: "space-between",
                  paddingVertical: 16,
                },
              ]}
            >
              <Typography variant="title" fontWeight={700}>
                threads.net
              </Typography>
              <View style={styles.logoContainer}>
                <Logo size={34} color="#fff" />
              </View>
            </View>
            <Typography variant="sm" color="secondary">
              Soon, you'll be able to follow and interact with people on other
              fediverse platforms, such as Mastodon. They can also find you with
              your full username,
            </Typography>
            <Typography variant="sm" color="secondary" fontWeight={700}>
              @oreku__@threads.net.
            </Typography>
          </View>
        </BottomSheet>
        <View
          style={[
            styles.header,
            {
              paddingTop: top + 12,
            },
          ]}
        >
          <TouchableOpacity activeOpacity={0.8}>
            <GlobeIcon size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginLeft: "auto",
            }}
          >
            <InstagramIcon size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/settings")}
          >
            <HamburgerIcon size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
          <View>
            <Typography variant="title" fontWeight={700}>
              oreku__
            </Typography>
            <View
              style={[
                styles.row,
                {
                  marginTop: 2,
                },
              ]}
            >
              <Typography variant="body">oreku__</Typography>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.pill,
                  {
                    backgroundColor: isDarkMode ? "#1E1E1E" : "#F5F5F5",
                  },
                ]}
                onPress={() => setIsThreadsBottomSheetOpen(true)}
              >
                <Typography
                  variant="tiny"
                  color={isDarkMode ? "#7A7A7A" : "#959595"}
                  style={{
                    lineHeight: undefined,
                  }}
                >
                  threads.net
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={{ uri: "https://picsum.photos/80" }}
            style={styles.avatar}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 16,
  },
  details: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  pill: {
    height: 26,
    borderRadius: 26 / 2,
    paddingHorizontal: 8,
    justifyContent: "center",
    marginLeft: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    resizeMode: "cover",
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
