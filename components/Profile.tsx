import { blurhash } from "@/constants/Blurhash";
import useColors from "@/hooks/useColors";
// import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";
import { VerifiedIcon } from "./Icons";
import { Image } from "react-native";

interface Props {
  showFollowers?: boolean;
}

function Profile(props: Props) {
  const colors = useColors();
  return (
    <Pressable style={[styles.container]}>
      <Image
        style={[
          styles.avatar,
          {
            borderColor: colors.border,
          },
        ]}
        source={{ uri: "https://picsum.photos/44" }}
      />
      <View
        style={[
          styles.content,
          {
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.username}>
            <Typography
              variant="sm"
              fontWeight={700}
              style={{
                marginBottom: 2,
              }}
              lineLimit={1}
            >
              username
            </Typography>
            <VerifiedIcon size={12} />
          </View>
          <Typography variant="sm" color="secondary" lineLimit={1}>
            Fan page for FC Barcelona Fan page for FC Barcelona
          </Typography>
          {props?.showFollowers ? (
            <Typography
              variant="sm"
              fontWeight={500}
              lineLimit={1}
              style={{
                marginTop: 8,
              }}
            >
              2.3k followers
            </Typography>
          ) : (
            <></>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.followButton,
            {
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <Typography variant="sm" fontWeight={500}>
            Follow
          </Typography>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

export default React.memo(Profile);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 44,
    borderWidth: 1,
    marginLeft: 16,
    marginRight: 12,
    marginTop: 16,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 16,
    flexDirection: "row",
    paddingRight: 16,
  },
  followButton: {
    width: 90,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
  },
  username: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
