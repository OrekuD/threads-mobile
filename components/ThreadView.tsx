import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Share,
  Image,
  ScrollView,
} from "react-native";
import {
  HeartFilledIcon,
  HeartIcon,
  MenuIcon,
  MessageIcon,
  RepostIcon,
  SendIcon,
} from "./Icons";
import useColors from "@/hooks/useColors";
import React from "react";
import Typography from "./Typography";
import useScreensize from "@/hooks/useScreensize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Thread } from "@/types";

interface Props {
  variant: "reply" | "thread" | "list-thread";
  thread: Thread;
}

function ThreadView(props: Props) {
  const colors = useColors();
  const { width } = useScreensize();
  const [isLiked, setIsLiked] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const buttons = React.useMemo(
    () => [
      {
        icon: MessageIcon,
        onPress: () => {},
      },
      {
        icon: RepostIcon,
        onPress: () => {},
      },
      {
        icon: SendIcon,
        onPress: () => {},
      },
    ],
    []
  );

  const images = React.useMemo(() => {
    return Array(3).fill("s");
  }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("ThreadScreen", {
            threadId: props.thread.id,
          });
        }}
        style={[
          styles.container,
          {
            borderColor: colors.cardBorder,
            width,
          },
        ]}
      >
        {props.variant === "thread" ? (
          <></>
        ) : (
          <View style={styles.leftContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.avatarContainer}
              onPress={() =>
                navigation.navigate("UserProfileScreen", {
                  user: props.thread.creator,
                })
              }
            >
              <Image
                style={styles.avatar}
                source={
                  props.thread.creator.avatar
                    ? { uri: props.thread.creator.avatar }
                    : require("../assets/images/no-avatar.jpeg")
                }
              />
            </TouchableOpacity>
            <View
              style={[
                styles.line,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />
            {images.length === 3 ? (
              <View style={styles.threeImages}>
                {images.map((_, index) => {
                  return (
                    <Image
                      key={index}
                      style={[
                        styles.smallAvatar,
                        {
                          borderColor: colors.border,
                          transform: [
                            { scale: 1 - index * 0.15 },
                            {
                              translateX:
                                index === 2 ? 0 : index === 0 ? 10 : -10,
                            },
                            {
                              translateY:
                                index === 2 ? -20 : index === 0 ? 3 : -10,
                            },
                          ],
                        },
                      ]}
                      source={
                        props.thread.creator.avatar
                          ? { uri: props.thread.creator.avatar }
                          : require("../assets/images/no-avatar.jpeg")
                      }
                    />
                  );
                })}
              </View>
            ) : (
              <View style={styles.twoImages}>
                {images.map((_, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.smallAvatarContainer,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <Image
                        style={[
                          styles.smallAvatar,
                          {
                            borderColor: colors.border,
                          },
                        ]}
                        source={
                          props.thread.creator.avatar
                            ? { uri: props.thread.creator.avatar }
                            : require("../assets/images/no-avatar.jpeg")
                        }
                      />
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
        <View style={{ flex: 1 }}>
          <View style={styles.top}>
            {props.variant === "thread" ? (
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
                    props.thread.creator.avatar
                      ? { uri: props.thread.creator.avatar }
                      : require("../assets/images/no-avatar.jpeg")
                  }
                />
              </View>
            ) : (
              <></>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("UserProfileScreen", {
                  user: props.thread.creator,
                })
              }
            >
              <Typography variant="sm" fontWeight={600}>
                {props.thread.creator.username}
              </Typography>
            </TouchableOpacity>
            <Typography
              variant="sm"
              color="secondary"
              style={{
                marginLeft: "auto",
              }}
            >
              33m
            </Typography>
            <TouchableOpacity activeOpacity={0.5}>
              <MenuIcon size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Typography variant="sm">{props.thread.text}</Typography>
          </View>
          {props.thread.media.length > 0 ? (
            <View
              style={[
                styles.imageContainer,
                {
                  width,
                  transform: [
                    {
                      translateX: props.variant === "thread" ? 0 : -70,
                    },
                  ],
                },
              ]}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 8,
                  paddingLeft: props.variant === "thread" ? 8 : 70,
                  paddingRight: props.variant === "thread" ? 8 : 16,
                }}
              >
                {props.thread.media.map((url, index) => {
                  const imageWidth =
                    props.variant === "thread" &&
                    props.thread.media.length === 1
                      ? width - 32
                      : props.thread.media.length === 1
                      ? width - 70 - 8
                      : width - 70 - 24;

                  return (
                    <Pressable
                      key={index}
                      style={{
                        borderRadius: 8,
                        overflow: "hidden",
                        width: imageWidth,
                        height:
                          props.thread.media.length > 1 ? 200 : imageWidth,
                      }}
                      onPress={() => {
                        // navigation.navigate("ThreadImagesScreen", {
                        //   threadId: "8",
                        // });
                      }}
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
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => setIsLiked((prevValue) => !prevValue)}
            >
              {isLiked ? (
                <HeartFilledIcon size={24} color="#FF2735" />
              ) : (
                <HeartIcon size={24} color={colors.text} />
              )}
            </TouchableOpacity>
            {buttons.map(({ icon: Icon, onPress }, index) => {
              return (
                <TouchableOpacity
                  style={styles.button}
                  onPress={onPress}
                  key={index}
                  activeOpacity={0.5}
                >
                  <Icon size={24} color={colors.text} />
                </TouchableOpacity>
              );
            })}
          </View>
          <Typography
            variant="sm"
            color="secondary"
            style={{
              marginTop: 5,
            }}
          >
            {props.thread.repliesCount} replies • {props.thread.likesCount}{" "}
            Likes
          </Typography>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default React.memo(
  ThreadView,
  (prevProps, nextProps) => prevProps.thread.id === nextProps.thread.id
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: "row",
  },
  buttons: {
    flexDirection: "row",
    alignContent: "center",
    gap: 4,
    marginTop: 2,
  },
  button: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  leftContainer: {
    alignItems: "center",
    height: "100%",
    marginRight: 12,
    paddingTop: 6,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    position: "relative",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    resizeMode: "cover",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    paddingVertical: 4,
  },
  line: {
    flex: 1,
    width: 2,
    marginVertical: 5,
  },
  twoImages: {
    flexDirection: "row",
    gap: -10,
    marginBottom: -2,
  },
  threeImages: {
    height: 25,
  },
  smallAvatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  smallAvatar: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    borderWidth: 1,
    resizeMode: "cover",
  },
  imageContainer: {
    marginVertical: 8,
  },
  closeButton: {
    position: "absolute",
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
  },
});
