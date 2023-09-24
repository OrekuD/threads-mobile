import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Share,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { VerifiedIcon } from "./Icons";
import useColors from "@/hooks/useColors";
import React from "react";
import Typography from "./Typography";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import Thread from "@/models/Thread";

interface Props {
  thread: Thread;
  disableNavigation?: boolean;
}

function EmbeddedThreadView(props: Props) {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      activeOpacity={props.disableNavigation ? 1 : 0.8}
      disabled={props.disableNavigation}
      onPress={() => {
        navigation.navigate("ThreadScreen", {
          thread: props.thread,
        });
      }}
      style={[
        styles.container,
        {
          borderColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={props.disableNavigation ? 1 : 0.8}
        disabled={props.disableNavigation}
        style={[
          styles.row,
          {
            gap: 4,
            paddingHorizontal: 16,
          },
        ]}
        onPress={() => {
          navigation.navigate("UserProfileScreen", {
            username: props.thread.user?.username || "",
          });
        }}
      >
        <View
          style={[
            styles.avatarContainer,
            {
              marginRight: 6,
            },
          ]}
        >
          <Image
            style={styles.avatar}
            source={
              props.thread.user?.profile?.profilePicture
                ? { uri: props.thread.user.profile.profilePicture }
                : require("../assets/images/no-avatar.jpeg")
            }
          />
        </View>
        <Typography variant="sm" fontWeight={600}>
          {props.thread.user?.username}
        </Typography>
        {props.thread.user?.profile?.isVerified ? (
          <VerifiedIcon size={12} />
        ) : null}
      </TouchableOpacity>

      <View style={styles.content}>
        <Typography
          variant="sm"
          style={{
            paddingHorizontal: 16,
          }}
        >
          {props.thread.text}
        </Typography>
        {props.thread.media.length > 0 ? (
          <View style={styles.imageContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 8,
                paddingHorizontal: 16,
              }}
            >
              {props.thread.media.map((url, index) => {
                const fullWidth = width - 64 - 32 - 2 - 16;
                const imageWidth =
                  props.thread.media.length === 1 ? fullWidth : 170;
                return (
                  <Pressable
                    key={index}
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                      width: imageWidth,
                      height:
                        imageWidth *
                        (props.thread.media.length === 1 ? 1.1 : 1.3),
                    }}
                    onPress={() => {}}
                    onLongPress={() => {
                      Share.share({
                        message: "",
                      });
                    }}
                  >
                    <Image
                      source={{ uri: url }}
                      style={{
                        borderRadius: 8,
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <></>
        )}
      </View>
      {(props.thread.replies.length === 0 && props.thread.likesCount === 0) ||
      props.thread.isLikesHidden ? null : (
        <Typography
          variant="sm"
          color="secondary"
          style={{
            paddingHorizontal: 16,
          }}
        >
          {`${
            props.thread.replies.length === 1
              ? "1 reply"
              : `${props.thread.replies.length} replies`
          } • ${
            props.thread.likesCount === 1
              ? "1 like"
              : `${props.thread.likesCount} likes`
          }`}
        </Typography>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(
  EmbeddedThreadView,
  (prevProps, nextProps) => prevProps.thread.id === nextProps.thread.id
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    position: "relative",
    borderWidth: 1,
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    resizeMode: "cover",
  },
  content: {
    paddingVertical: 8,
  },
  imageContainer: {
    width: "100%",
    marginTop: 8,
  },
});
