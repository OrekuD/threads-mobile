import useFollowUserMutation from "@/hooks/mutations/useFollowUserMutation";
import Notification from "@/models/Notification";
import NotificationTypes from "@/namespaces/NotificationTypes";
import useToastsStore from "@/store/toastsStore";
import useUserFollowsStore from "@/store/userFollowsStore";
import useUserStore from "@/store/userStore";
import { RootStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";
import useColors from "@/hooks/useColors";
import { VerifiedIcon } from "./Icons";

interface Props {
  notification: Notification;
}

function ActivityView(props: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colors = useColors();
  const following = useUserFollowsStore((state) => state.following);
  const user = useUserStore((state) => state.user);
  const followUserMutation = useFollowUserMutation();
  const [isFollowing, setIsFollowing] = React.useState(
    () =>
      following.findIndex(
        (user) => Number(user.id) === Number(props.notification?.fromUser?.id)
      ) !== -1
  );

  const toastsStore = useToastsStore();

  const Icon = NotificationTypes.icon(props.notification.notificationType);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => {
        if (
          props.notification.notificationType ===
          NotificationTypes.State.FOLLOWED_YOU
        ) {
          if (user?.id === props.notification.fromUser?.id) {
            navigation.navigate("MainScreen", {
              screen: "ProfileScreen",
            });
          } else {
            navigation.navigate("UserProfileScreen", {
              username: props.notification.fromUser!.username,
            });
          }
        } else {
          if (props.notification.thread === undefined) return;
          navigation.navigate("ThreadScreen", {
            thread: props.notification.thread!,
          });
        }
      }}
    >
      <View
        style={[
          styles.avatarContainer,
          {
            marginTop: props.notification.thread?.text ? 16 : 8,
          },
        ]}
      >
        <Image
          source={
            props.notification.fromUser?.profile?.profilePicture
              ? { uri: props.notification.fromUser.profile.profilePicture }
              : require("../assets/images/no-avatar.jpeg")
          }
          style={[
            styles.avatar,
            {
              borderColor: colors.border,
            },
          ]}
          resizeMode="cover"
        />
        <View
          style={[
            styles.icon,
            {
              borderColor: colors.background,
              backgroundColor: NotificationTypes.color(
                props.notification.notificationType
              ),
            },
          ]}
        >
          <Icon size={10} color="#fff" />
        </View>
      </View>
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
              {props.notification.fromUser?.username}
            </Typography>
            {props?.notification?.fromUser?.profile?.isVerified ? (
              <VerifiedIcon size={12} />
            ) : (
              <></>
            )}
          </View>
          <Typography variant="sm" color="secondary" lineLimit={1}>
            {NotificationTypes.text(props.notification.notificationType)}
          </Typography>
          {props.notification.thread?.text ? (
            <Typography variant="sm">
              {props.notification.thread.text}
            </Typography>
          ) : null}
        </View>
        {user?.id === props.notification.fromUser?.id ||
        props.notification.notificationType !==
          NotificationTypes.State.FOLLOWED_YOU ? null : (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.followButton,
              {
                borderColor: colors.cardBorder,
              },
            ]}
            onPress={() => {
              if (!props.notification.fromUser?.id) return;

              followUserMutation.mutate({
                userId: String(props.notification.fromUser.id),
              });

              if (isFollowing) {
                toastsStore.addToast("Unfollowed");
              }

              setIsFollowing((prevValue) => !prevValue);
            }}
          >
            <Typography variant="sm" fontWeight={500}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(
  ActivityView,
  (prevProps, nextProps) =>
    prevProps.notification.id === nextProps.notification.id
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 44,
    borderWidth: 1,
    marginLeft: 16,
    marginRight: 12,
    marginTop: 8,
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 44,
  },
  icon: {
    position: "absolute",
    bottom: -4,
    left: -4,
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6642e7",
    zIndex: 4,
    borderWidth: 2,
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
