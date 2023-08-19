import useColors from "@/hooks/useColors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";
import { VerifiedIcon } from "./Icons";
import { Image } from "expo-image";
import { RootStackParamList, User } from "@/types";
import formatNumber from "@/util/formatNumber";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  user: User;
  showFollowers?: boolean;
  isModal?: boolean;
}

function Profile(props: Props) {
  const colors = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(
          props.isModal ? "UserProfileModalScreen" : "UserProfileScreen",
          {
            user: props.user,
          }
        )
      }
    >
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
        transition={300}
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
    </TouchableOpacity>
  );
}

export default React.memo(
  Profile,
  (prev, next) => prev.user.id === next.user.id
);

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
    contentFit: "cover",
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
