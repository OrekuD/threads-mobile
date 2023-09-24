import useColors from "@/hooks/useColors";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";
import { VerifiedIcon } from "./Icons";
import { RootStackParamList } from "@/types";
import formatNumber from "@/utils/formatNumber";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import User from "@/models/User";
import AlgoliaUser from "@/models/AlgoliaUser";
import useUserFollowsStore from "@/store/userFollowsStore";
import useFollowUserMutation from "@/hooks/mutations/useFollowUserMutation";
import useUserStore from "@/store/userStore";

interface Props {
  user: User | AlgoliaUser;
  showFollowers?: boolean;
  isModal?: boolean;
}

function Profile(props: Props) {
  const colors = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const following = useUserFollowsStore((state) => state.following);
  const user = useUserStore((state) => state.user);
  const followUserMutation = useFollowUserMutation();
  const [isFollowing, setIsFollowing] = React.useState(() => {
    if ("isFollowedByCurrentUser" in props.user) {
      return props.user.isFollowedByCurrentUser;
    }
    const index = following.findIndex(
      (user) => Number(user.id) === Number(props.user.id)
    );
    return index !== -1;
  });
  const [followersCount, setFollowersCount] = React.useState(
    props.user.followersCount
  );

  const data = React.useMemo(
    () => ({
      id: Number(props.user.id),
      username: props.user.username,
      name: props.user.name,
      isVerified:
        "isVerified" in props.user
          ? props.user.isVerified
          : props.user?.profile?.isVerified || false,
      avatar:
        "profilePicture" in props.user
          ? props.user.profilePicture
          : props.user?.profile?.profilePicture,
      followersCount: props.user.followersCount,
    }),
    [props.user]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => {
        if (user?.id === data.id) {
          navigation.navigate("MainScreen", {
            screen: "ProfileScreen",
          });
        } else {
          navigation.navigate(
            props.isModal ? "UserProfileModalScreen" : "UserProfileScreen",
            {
              username: data.username,
            }
          );
        }
      }}
    >
      <Image
        source={
          data.avatar
            ? { uri: data.avatar }
            : require("../assets/images/no-avatar.jpeg")
        }
        style={[
          styles.avatar,
          {
            borderColor: colors.border,
            marginTop: props.showFollowers ? 16 : 8,
          },
        ]}
        resizeMode="cover"
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
              {data.username}
            </Typography>
            {data.isVerified ? <VerifiedIcon size={12} /> : <></>}
          </View>
          <Typography variant="sm" color="secondary" lineLimit={1}>
            {data.name}
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
              {formatNumber(followersCount)} followers
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
          onPress={() => {
            if (!props.user?.id) return;

            if (isFollowing) {
              setFollowersCount((prevValue) =>
                prevValue === 0 ? 0 : prevValue - 1
              );
            } else {
              setFollowersCount((prevValue) => prevValue + 1);
            }

            followUserMutation.mutate({
              userId: String(props.user.id),
            });

            setIsFollowing((prevValue) => !prevValue);
          }}
        >
          <Typography variant="sm" fontWeight={500}>
            {isFollowing ? "Unfollow" : "Follow"}
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
  },
  content: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    flexDirection: "row",
    paddingRight: 16,
  },
  followButton: {
    width: 98,
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
