import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Image,
  ScrollView,
  Share,
  ActivityIndicator,
} from "react-native";
import {
  AddToStoryIcon,
  ChevronLeftIcon,
  HeartFilledIcon,
  HeartIcon,
  InstagramIcon,
  LinkIcon,
  MenuIcon,
  MessageIcon,
  QuoteIcon,
  RepostIcon,
  SendIcon,
  ShareIcon,
  TwitterIcon,
  VerifiedIcon,
} from "./Icons";
import useColors from "@/hooks/useColors";
import React from "react";
import Typography from "./Typography";
import useScreensize from "@/hooks/useScreensize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import BottomSheet from "./BottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmbeddedThreadView from "./EmbeddedThreadView";
import Thread from "@/models/Thread";
import useThreadStore from "@/store/threadStore";
import formatDistance from "@/utils/formatDistance";
import useLikeThreadMutation from "@/hooks/mutations/useLikeThreadMutation";
import useRepostThreadMutation from "@/hooks/mutations/useRepostThreadMutation";
import * as Clipboard from "expo-clipboard";
import useUserStore from "@/store/userStore";
import useToggleThreadLikesVisibilityMutation from "@/hooks/mutations/useToggleThreadLikesVisibilityMutation";
import useToastsStore from "@/store/toastsStore";
import ThreadReport from "@/namespaces/ThreadReport";
import {
  BottomSheetScrollView,
  TouchableOpacity as BottomSheetTouchableOpacity,
} from "@gorhom/bottom-sheet";
import useCreateThreadReportMutation from "@/hooks/mutations/useCreateThreadReportMutation";

type ThreadViewVariant =
  | "reply"
  | "thread"
  | "list-thread"
  | "reply-thread"
  | "quote";

interface Props {
  variant: ThreadViewVariant;
  thread: Thread;
  pointerEvents?: "none" | "auto";
}

function ThreadView(props: Props) {
  const colors = useColors();
  const { width } = useScreensize();
  const [isLiked, setIsLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(props.thread.likesCount);
  const [isRepostBottomSheetVisible, setIsRepostBottomSheetVisible] =
    React.useState(false);
  const [isSendPostBottomSheetVisible, setIsSendPostBottomSheetVisible] =
    React.useState(false);
  const [isPostOptionsBottomSheetVisible, setIsPostOptionsBottomSheetVisible] =
    React.useState(false);
  const [
    isReportThreadBottomSheetVisible,
    setIsReportThreadBottomSheetVisible,
  ] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const threadStore = useThreadStore();
  const likeThreadMutation = useLikeThreadMutation();
  const repostThreadMutation = useRepostThreadMutation();
  const [isLikesHidden, setIsLikesHidden] = React.useState(
    props.thread.isLikesHidden
  );

  const buttons = React.useMemo(
    () => [
      {
        icon: MessageIcon,
        onPress: () => {
          threadStore.setThread(props.thread);
          navigation.navigate("CreateThreadScreen", {
            type: "reply",
            threadId: props.thread.threadId,
          });
        },
      },
      {
        icon: RepostIcon,
        onPress: () => {
          setIsRepostBottomSheetVisible(true);
        },
      },
      {
        icon: SendIcon,
        onPress: () => {
          setIsSendPostBottomSheetVisible(true);
        },
      },
    ],
    [props.thread.id]
  );

  return (
    <>
      <RepostBottomSheet
        isOpen={isRepostBottomSheetVisible}
        onClose={() => setIsRepostBottomSheetVisible(false)}
        thread={props.thread}
      />
      <ReportThreadBottomSheet
        isOpen={isReportThreadBottomSheetVisible}
        onClose={() => setIsReportThreadBottomSheetVisible(false)}
        thread={props.thread}
      />
      <PostOptionsBottomSheet
        isOpen={isPostOptionsBottomSheetVisible}
        onClose={() => setIsPostOptionsBottomSheetVisible(false)}
        thread={props.thread}
        isLikesHidden={isLikesHidden}
        setIsLikesHidden={setIsLikesHidden}
        openReportThreadBottomSheet={() => {
          setIsPostOptionsBottomSheetVisible(false);
          setTimeout(() => {
            setIsReportThreadBottomSheetVisible(true);
          }, 400);
        }}
      />
      <SendPostOptionsBottomSheet
        isOpen={isSendPostBottomSheetVisible}
        onClose={() => setIsSendPostBottomSheetVisible(false)}
        thread={props.thread}
      />
      <TouchableOpacity
        activeOpacity={props.variant === "thread" ? 1 : 0.8}
        disabled={props.variant === "thread"}
        onPress={() => {
          navigation.navigate("ThreadScreen", {
            threadId: props.thread.threadId,
          });
        }}
        style={[
          styles.container,
          {
            borderColor: colors.cardBorder,
            width,
            borderBottomWidth: props.variant === "reply-thread" ? 0 : 1,
            paddingLeft: props.variant === "thread" ? 16 : 0,
            pointerEvents: props.pointerEvents,
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
                  username: props.thread.user?.username || "",
                })
              }
            >
              <Image
                style={styles.avatar}
                source={
                  props.thread.user?.profile?.profilePicture
                    ? { uri: props.thread.user.profile.profilePicture }
                    : require("../assets/images/no-avatar.jpeg")
                }
              />
            </TouchableOpacity>
            <View
              style={[
                styles.line,
                {
                  backgroundColor: colors.border,
                  marginBottom: props.variant === "reply-thread" ? 0 : 5,
                  height: "100%",
                },
              ]}
            />
            {props.variant === "reply-thread" ? (
              <></>
            ) : (
              <>
                {[].length === 3 ? (
                  <View style={styles.threeImages}>
                    {[].map((image, index) => {
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
                            props.thread.user?.profile?.profilePicture
                              ? {
                                  uri: props.thread.user.profile.profilePicture,
                                }
                              : require("../assets/images/no-avatar.jpeg")
                          }
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={styles.twoImages}>
                    {[].map((_, index) => {
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
                              props.thread.user?.profile?.profilePicture
                                ? {
                                    uri: props.thread.user.profile
                                      .profilePicture,
                                  }
                                : require("../assets/images/no-avatar.jpeg")
                            }
                          />
                        </View>
                      );
                    })}
                  </View>
                )}
              </>
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
                    props.thread.user?.profile?.profilePicture
                      ? { uri: props.thread.user.profile.profilePicture }
                      : require("../assets/images/no-avatar.jpeg")
                  }
                />
              </View>
            ) : (
              <></>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.row,
                {
                  gap: 4,
                },
              ]}
              onPress={() =>
                navigation.navigate("UserProfileScreen", {
                  username: props.thread.user?.username || "",
                })
              }
            >
              <Typography variant="sm" fontWeight={600}>
                {props.thread.user?.username}
              </Typography>
              {props.thread.user?.profile?.isVerified ? (
                <VerifiedIcon size={12} />
              ) : null}
            </TouchableOpacity>
            {props.variant === "reply-thread" ? null : (
              <>
                <Typography
                  variant="sm"
                  color="secondary"
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {formatDistance(props.thread.createdAt)}
                </Typography>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setIsPostOptionsBottomSheetVisible(true)}
                >
                  <MenuIcon size={24} color={colors.text} />
                </TouchableOpacity>
              </>
            )}
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
                      : (width - 70 - 8) * 0.65;

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
                      onPress={() => {
                        // navigation.navigate("ThreadImagesScreen", {
                        //   threadId: "8",
                        // });
                      }}
                      onLongPress={() => {
                        const url = `${process.env.EXPO_PUBLIC_CLIENT_URL}/@${props.thread.user?.username}/post/${props.thread.threadId}`;
                        Share.share({
                          url,
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
          {
            // TODO: check if this should be quote / reply
          }
          {props.thread.quoteThead ? (
            <EmbeddedThreadView thread={props.thread.quoteThead} />
          ) : (
            <></>
          )}
          {props.variant === "reply-thread" ? (
            <></>
          ) : (
            <>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.5}
                  onPress={() => {
                    if (isLiked) {
                      setLikesCount((prevValue) =>
                        prevValue === 0 ? 0 : prevValue - 1
                      );
                    } else {
                      setLikesCount((prevValue) => prevValue + 1);
                    }
                    setIsLiked((value) => !value);
                    likeThreadMutation.mutate({
                      threadId: props.thread.threadId,
                    });
                  }}
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
              {(props.thread.replies.length === 0 && likesCount === 0) ||
              props.thread.isLikesHidden ? null : (
                <Typography
                  variant="sm"
                  color="secondary"
                  style={{
                    marginTop: 5,
                  }}
                >
                  {`${
                    props.thread.replies.length === 1
                      ? "1 reply"
                      : `${props.thread.replies.length} replies`
                  } • ${likesCount === 1 ? "1 like" : `${likesCount} likes`}`}
                </Typography>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
}

export default React.memo(
  ThreadView,
  (prevProps, nextProps) => prevProps.thread.id === nextProps.thread.id
);

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  thread: Thread;
}

function RepostBottomSheet(props: BottomSheetProps) {
  const colors = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const buttons = React.useMemo(
    () => [
      { label: "Repost", icon: RepostIcon, onPress: () => {} },
      {
        label: "Quote",
        icon: QuoteIcon,
        onPress: () => {
          props.onClose();
          setTimeout(() => {
            navigation.navigate("CreateThreadScreen", {
              threadId: props.thread.threadId,
              type: "quote",
            });
          }, 300);
        },
      },
    ],
    []
  );
  return (
    <BottomSheet
      isOpen={props.isOpen}
      onClose={props.onClose}
      height={54 * 2 + (bottom || 20) + 56}
    >
      <View
        style={{
          paddingHorizontal: 16,
          gap: 12,
          paddingTop: 6,
        }}
      >
        {buttons.map(({ label, icon: Icon, onPress }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={label}
              onPress={onPress}
              style={[
                styles.bottomSheetButton,
                {
                  backgroundColor: colors.bottomSheetButtonColor,
                },
              ]}
            >
              <Typography variant="sm" fontWeight={600} color={colors.text}>
                {label}
              </Typography>
              <Icon size={24} color={colors.text} />
            </TouchableOpacity>
          );
        })}
      </View>
    </BottomSheet>
  );
}

function PostOptionsBottomSheet(
  props: BottomSheetProps & {
    isLikesHidden: boolean;
    setIsLikesHidden: React.Dispatch<React.SetStateAction<boolean>>;
    openReportThreadBottomSheet: () => void;
  }
) {
  const colors = useColors();
  const user = useUserStore((state) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const toggleThreadLikesVisibilityMutation =
    useToggleThreadLikesVisibilityMutation();
  const toastsStore = useToastsStore();

  const isCurrentUserCreator = React.useMemo(
    () => user?.id === props.thread.user?.id,
    [user?.id, props.thread.user?.id]
  );

  const optionsList1 = React.useMemo(() => {
    if (isCurrentUserCreator) {
      return [
        {
          label: props.isLikesHidden ? "Unhide like count" : "Hide like count",
          onPress: () => {
            if (props.isLikesHidden) {
              toastsStore.addToast("Like count unhidden");
            } else {
              toastsStore.addToast("Like count hidden");
            }
            props.setIsLikesHidden((prevValue) => !prevValue);
            toggleThreadLikesVisibilityMutation.mutate({
              threadId: props.thread.threadId,
            });
          },
        },
      ];
    }
    return [
      { label: "Repost", onPress: () => {} },
      {
        label: "Quote",
        onPress: () => {
          props.onClose();
          setTimeout(() => {
            navigation.navigate("CreateThreadScreen", {
              threadId: props.thread.threadId,
              type: "quote",
            });
          }, 300);
        },
      },
    ];
  }, [isCurrentUserCreator, props.isLikesHidden]);

  const optionsList2 = React.useMemo(() => {
    if (isCurrentUserCreator) {
      return [
        {
          label: "Delete",
          onPress: () => {},
        },
      ];
    }
    return [{ label: "Report", onPress: props.openReportThreadBottomSheet }];
  }, [isCurrentUserCreator]);

  return (
    <BottomSheet
      isOpen={props.isOpen}
      onClose={props.onClose}
      height={54 * (isCurrentUserCreator ? 2 : 3) + (bottom || 20) + 44 + 24}
    >
      <View
        style={{
          paddingHorizontal: 16,
          gap: 16,
          paddingTop: 6,
        }}
      >
        <View
          style={{
            backgroundColor: colors.bottomSheetButtonColor,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {optionsList1.map(({ label, onPress }, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={label}
                onPress={onPress}
                style={[
                  styles.bottomSheetButton,

                  {
                    borderRadius: 0,
                    backgroundColor: colors.bottomSheetButtonColor,
                    borderBottomWidth:
                      index === 0 ? StyleSheet.hairlineWidth : 0,
                    borderBottomColor: colors.bottomSheetButtonBorderColor,
                  },
                ]}
              >
                <Typography variant="sm" fontWeight={600} color={colors.text}>
                  {label}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: colors.bottomSheetButtonColor,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {optionsList2.map(({ label, onPress }, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={label}
                onPress={onPress}
                style={[
                  styles.bottomSheetButton,

                  {
                    borderRadius: 0,
                    backgroundColor: colors.bottomSheetButtonColor,
                    borderBottomWidth: 0,
                    borderBottomColor: colors.bottomSheetButtonBorderColor,
                  },
                ]}
              >
                <Typography variant="sm" fontWeight={600} color={"red"}>
                  {label}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </BottomSheet>
  );
}

function SendPostOptionsBottomSheet(props: BottomSheetProps) {
  const colors = useColors();
  const { bottom } = useSafeAreaInsets();
  // const optionsList1 = React.useMemo(
  //   () => [
  //     {
  //       label: "Send on Instagram",
  //       icon: SendIcon,
  //       onPress: () => {},
  //       iconSize: 26,
  //     },
  //     {
  //       label: "Add to story",
  //       icon: AddToStoryIcon,
  //       onPress: () => {},
  //       iconSize: 24,
  //     },
  //     {
  //       label: "Post to feed",
  //       icon: InstagramIcon,
  //       onPress: () => {},
  //       iconSize: 20,
  //     },
  //     {
  //       label: "Post to",
  //       icon: TwitterIcon,
  //       onPress: () => {},
  //       iconSize: 16,
  //     },
  //   ],
  //   []
  // );

  const optionsList2 = React.useMemo(
    () => [
      {
        label: "Copy link",
        icon: LinkIcon,
        onPress: async () => {
          const url = `${process.env.EXPO_PUBLIC_CLIENT_URL}/@${props.thread.user?.username}/post/${props.thread.threadId}`;
          await Clipboard.setStringAsync(url);
        },
      },
      {
        label: "Share via...",
        icon: ShareIcon,
        onPress: () => {
          const url = `${process.env.EXPO_PUBLIC_CLIENT_URL}/@${props.thread.user?.username}/post/${props.thread.threadId}`;
          Share.share({
            url,
          });
        },
      },
    ],
    []
  );

  return (
    <BottomSheet
      isOpen={props.isOpen}
      onClose={props.onClose}
      height={54 * 2 + (bottom || 20) + 44 + 24}
    >
      <View
        style={{
          paddingHorizontal: 16,
          gap: 16,
          paddingTop: 6,
        }}
      >
        {/* <View
          style={{
            backgroundColor: colors.bottomSheetButtonColor,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {optionsList1.map(
            ({ label, onPress, icon: Icon, iconSize }, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={label}
                  onPress={onPress}
                  style={[
                    styles.bottomSheetButton,

                    {
                      borderRadius: 0,
                      backgroundColor: colors.bottomSheetButtonColor,
                      borderTopWidth:
                        index === 0 ? 0 : StyleSheet.hairlineWidth,
                      borderColor: colors.bottomSheetButtonBorderColor,
                    },
                  ]}
                >
                  <Typography variant="sm" fontWeight={600} color={colors.text}>
                    {label}
                  </Typography>
                  <Icon size={iconSize} color={colors.text} />
                </TouchableOpacity>
              );
            }
          )}
        </View> */}
        <View
          style={{
            backgroundColor: colors.bottomSheetButtonColor,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {optionsList2.map(({ label, onPress, icon: Icon }, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={label}
                onPress={onPress}
                style={[
                  styles.bottomSheetButton,

                  {
                    borderRadius: 0,
                    backgroundColor: colors.bottomSheetButtonColor,
                    borderBottomWidth:
                      index === 0 ? StyleSheet.hairlineWidth : 0,
                    borderBottomColor:
                      index === 0
                        ? colors.bottomSheetButtonBorderColor
                        : undefined,
                  },
                ]}
              >
                <Typography variant="sm" fontWeight={600}>
                  {label}
                </Typography>
                <Icon size={24} color={colors.text} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </BottomSheet>
  );
}

function ReportThreadBottomSheet(props: BottomSheetProps) {
  const colors = useColors();
  const { height } = useScreensize();
  const { bottom } = useSafeAreaInsets();
  const createThreadReportMutation = useCreateThreadReportMutation();

  React.useEffect(() => {
    if (createThreadReportMutation.isSuccess) {
      props.onClose();
    }
  }, [createThreadReportMutation.isSuccess]);

  return (
    <BottomSheet
      isOpen={props.isOpen}
      onClose={props.onClose}
      height={height * 0.7}
    >
      <View
        style={{
          paddingBottom: bottom || 24,
          flex: 1,
        }}
      >
        <Typography variant="body" fontWeight={700} textAlign="center">
          Report
        </Typography>
        <View
          style={{
            paddingHorizontal: 24,
            borderTopWidth: 1,
            borderColor: colors.textInputBorderColor,
            marginTop: 12,
            paddingVertical: 14,
          }}
        >
          <Typography variant="sm" fontWeight={700}>
            Why are you reporting this post?
          </Typography>
        </View>
        <BottomSheetScrollView
          style={{
            backgroundColor: colors.textInputBackgroundColor,
          }}
        >
          {ThreadReport.list().map((id) => {
            return (
              <BottomSheetTouchableOpacity
                activeOpacity={0.8}
                key={id.toString()}
                style={[
                  styles.bottomSheetButton,
                  {
                    borderTopWidth: 1,
                    borderColor: colors.textInputBorderColor,
                    borderRadius: 0,
                    opacity: createThreadReportMutation.isLoading ? 0.5 : 1,
                  },
                ]}
                onPress={() => {
                  createThreadReportMutation.mutate({
                    threadId: props.thread.threadId,
                    descriptionId: id,
                  });
                }}
                disabled={createThreadReportMutation.isLoading}
              >
                <Typography variant="sm" fontWeight={500}>
                  {ThreadReport.text(id)}
                </Typography>
                {createThreadReportMutation.isLoading &&
                createThreadReportMutation.variables?.descriptionId === id ? (
                  <ActivityIndicator size="small" color={colors.text} />
                ) : (
                  <ChevronLeftIcon
                    size={12}
                    color={colors.text}
                    strokeWidth={1}
                    style={{
                      transform: [
                        {
                          rotate: "180deg",
                        },
                      ],
                    }}
                  />
                )}
              </BottomSheetTouchableOpacity>
            );
          })}
        </BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingRight: 12,
    paddingVertical: 14,
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
    paddingTop: 4,
    width: 64,
  },
  avatarContainer: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    position: "relative",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
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
  bottomSheetButton: {
    width: "100%",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 54,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
