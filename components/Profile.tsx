import { blurhash } from "@/constants/Blurhash";
import useColors from "@/hooks/useColors";
// import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";
import { VerifiedIcon } from "./Icons";
import { Image } from "react-native";
import { User } from "@/types";
import formatNumber from "@/util/formatNumber";

interface Props {
  showFollowers?: boolean;
  user: User;
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
        source={
          props.user.avatar
            ? { uri: props.user.avatar }
            : require("../assets/images/no-avatar.jpeg")
        }
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
              {props.user.username}
            </Typography>
            {props.user.isVerified ? <VerifiedIcon size={12} /> : <></>}
          </View>
          <Typography variant="sm" color="secondary" lineLimit={1}>
            {props.user.name}
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
              {formatNumber(props.user.followersCount)} followers
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
